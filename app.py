"""
Flask приложение для лендинга спа-салона LUMMEH
"""
from flask import Flask, render_template, request, jsonify, send_from_directory, abort
from loguru import logger
import os
import json
import jwt
from werkzeug.utils import secure_filename
from functools import wraps

app = Flask(__name__, template_folder='app/templates', static_folder='app/static')
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'dev-secret-key-change-in-production')
app.config['UPLOAD_FOLDER'] = 'app/static/images'
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max file size
app.config['ALLOWED_EXTENSIONS'] = {'png', 'jpg', 'jpeg', 'gif', 'webp'}

# Путь к файлам данных
DATA_DIR = 'data'
GALLERY_FILE = os.path.join(DATA_DIR, 'gallery.json')
SERVICES_FILE = os.path.join(DATA_DIR, 'services.json')
PROGRAMS_FILE = os.path.join(DATA_DIR, 'programs.json')

# Создаем директорию для данных, если её нет
os.makedirs(DATA_DIR, exist_ok=True)

# Настройка кэширования для статических файлов
@app.after_request
def add_cache_headers(response):
    """Добавляет заголовки кэширования для статических файлов"""
    if request.endpoint == 'static' or request.path.startswith('/static/'):
        # Кэшируем статику на 1 год
        cache_timeout = 31536000  # 1 год в секундах
        response.cache_control.max_age = cache_timeout
        response.cache_control.public = True
        response.cache_control.immutable = True
    else:
        # Для HTML страниц - короткое кэширование
        response.cache_control.max_age = 300  # 5 минут
        response.cache_control.public = True
    return response


@app.route('/')
def index():
    """Главная страница лендинга"""
    return render_template('index.html')


@app.route('/api/services', methods=['GET'])
def get_services():
    """Публичный API для получения услуг"""
    services = load_json_file(SERVICES_FILE, {})
    return jsonify(services)


@app.route('/api/programs', methods=['GET'])
def get_programs():
    """Публичный API для получения программ"""
    programs = load_json_file(PROGRAMS_FILE, {})
    return jsonify(programs)


@app.route('/api/gallery', methods=['GET'])
def get_gallery():
    """Публичный API для получения галереи"""
    gallery = load_json_file(GALLERY_FILE, {'images': []})
    return jsonify(gallery)


def verify_jwt_token(token):
    """Проверяет JWT токен"""
    try:
        decoded = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
        return decoded
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None


def jwt_required(f):
    """Декоратор для проверки JWT токена"""
    @wraps(f)
    def decorated_function(*args, **kwargs):
        token = kwargs.get('token') or request.args.get('token')
        if not token:
            abort(401)
        if not verify_jwt_token(token):
            abort(401)
        return f(*args, **kwargs)
    return decorated_function


def allowed_file(filename):
    """Проверяет разрешенное расширение файла"""
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in app.config['ALLOWED_EXTENSIONS']


def load_json_file(filepath, default=None):
    """Загружает JSON файл"""
    if default is None:
        default = {}
    try:
        if os.path.exists(filepath):
            with open(filepath, 'r', encoding='utf-8') as f:
                return json.load(f)
        return default
    except Exception as e:
        logger.error(f"Ошибка загрузки {filepath}: {e}")
        return default


def save_json_file(filepath, data):
    """Сохраняет JSON файл"""
    try:
        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        return True
    except Exception as e:
        logger.error(f"Ошибка сохранения {filepath}: {e}")
        return False


@app.route('/api/book', methods=['POST'])
def book_appointment():
    """API endpoint для записи на визит"""
    try:
        data = request.get_json()
        
        name = data.get('name', '').strip()
        phone = data.get('phone', '').strip()
        time = data.get('time', '').strip()
        comment = data.get('comment', '').strip()
        
        # Валидация
        if not name or not phone:
            return jsonify({'success': False, 'message': 'Имя и телефон обязательны'}), 400
        
        # Логирование заявки
        logger.info(f"Новая заявка: {name}, {phone}, {time}, {comment}")
        
        # TODO: Здесь должна быть отправка email/сохранение в БД
        # Например: send_email_to_admin(name, phone, time, comment)
        
        return jsonify({
            'success': True,
            'message': 'Спасибо! Мы свяжемся с вами в ближайшее время.'
        })
    
    except Exception as e:
        logger.error(f"Ошибка при обработке заявки: {e}")
        return jsonify({'success': False, 'message': 'Произошла ошибка. Попробуйте позже.'}), 500


@app.route('/<token>/admin')
@jwt_required
def admin_panel(token):
    """Админ-панель"""
    return render_template('admin.html', token=token)


@app.route('/api/<token>/admin/gallery', methods=['GET', 'POST'])
@jwt_required
def admin_gallery(token):
    """API для работы с галереей"""
    if request.method == 'GET':
        gallery = load_json_file(GALLERY_FILE, {'images': []})
        return jsonify(gallery)
    
    elif request.method == 'POST':
        data = request.get_json()
        if save_json_file(GALLERY_FILE, data):
            return jsonify({'success': True})
        return jsonify({'success': False, 'message': 'Ошибка сохранения'}), 500


@app.route('/api/<token>/admin/services', methods=['GET', 'POST'])
@jwt_required
def admin_services(token):
    """API для работы с услугами"""
    if request.method == 'GET':
        services = load_json_file(SERVICES_FILE, {})
        return jsonify(services)
    
    elif request.method == 'POST':
        data = request.get_json()
        if save_json_file(SERVICES_FILE, data):
            return jsonify({'success': True})
        return jsonify({'success': False, 'message': 'Ошибка сохранения'}), 500


@app.route('/api/<token>/admin/programs', methods=['GET', 'POST'])
@jwt_required
def admin_programs(token):
    """API для работы с программами"""
    if request.method == 'GET':
        programs = load_json_file(PROGRAMS_FILE, {})
        return jsonify(programs)
    
    elif request.method == 'POST':
        data = request.get_json()
        if save_json_file(PROGRAMS_FILE, data):
            return jsonify({'success': True})
        return jsonify({'success': False, 'message': 'Ошибка сохранения'}), 500


@app.route('/api/<token>/admin/upload', methods=['POST'])
@jwt_required
def admin_upload(token):
    """API для загрузки изображений"""
    try:
        if 'file' not in request.files:
            logger.error("Файл не найден в запросе")
            return jsonify({'success': False, 'message': 'Файл не найден'}), 400
        
        file = request.files['file']
        if file.filename == '':
            logger.error("Имя файла пустое")
            return jsonify({'success': False, 'message': 'Файл не выбран'}), 400
        
        if not allowed_file(file.filename):
            logger.error(f"Недопустимый формат файла: {file.filename}")
            return jsonify({'success': False, 'message': 'Недопустимый формат файла. Разрешены: png, jpg, jpeg, gif, webp'}), 400
        
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        
        # Создаем директорию, если её нет
        os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
        
        file.save(filepath)
        logger.info(f"Загружено изображение: {filename} в {filepath}")
        
        # Проверяем, что файл действительно сохранен
        if os.path.exists(filepath):
            return jsonify({'success': True, 'filename': filename})
        else:
            logger.error(f"Файл не был сохранен: {filepath}")
            return jsonify({'success': False, 'message': 'Ошибка сохранения файла'}), 500
            
    except Exception as e:
        logger.error(f"Ошибка при загрузке файла: {e}")
        return jsonify({'success': False, 'message': f'Ошибка сервера: {str(e)}'}), 500


@app.route('/api/<token>/admin/delete-image', methods=['POST'])
@jwt_required
def admin_delete_image(token):
    """API для удаления изображений"""
    data = request.get_json()
    filename = data.get('filename')
    
    if not filename:
        return jsonify({'success': False, 'message': 'Имя файла не указано'}), 400
    
    filepath = os.path.join(app.config['UPLOAD_FOLDER'], secure_filename(filename))
    
    if os.path.exists(filepath):
        try:
            os.remove(filepath)
            logger.info(f"Удалено изображение: {filename}")
            return jsonify({'success': True})
        except Exception as e:
            logger.error(f"Ошибка удаления файла: {e}")
            return jsonify({'success': False, 'message': 'Ошибка удаления файла'}), 500
    
    return jsonify({'success': False, 'message': 'Файл не найден'}), 404


if __name__ == '__main__':
    debug_mode = os.environ.get('FLASK_DEBUG', 'False').lower() == 'true'
    logger.info(f"Запуск Flask приложения (debug={debug_mode})")
    app.run(debug=debug_mode, host='0.0.0.0', port=int(os.environ.get('PORT', 5000)))

