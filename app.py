"""
Flask приложение для лендинга спа-салона LUMMEH
"""
from flask import Flask, render_template, request, jsonify
from loguru import logger
import os

app = Flask(__name__, template_folder='app/templates', static_folder='app/static')
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'dev-secret-key-change-in-production')


@app.route('/')
def index():
    """Главная страница лендинга"""
    return render_template('index.html')


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


if __name__ == '__main__':
    logger.info("Запуск Flask приложения")
    app.run(debug=True, host='0.0.0.0', port=5000)

