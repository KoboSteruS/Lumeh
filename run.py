"""
Точка входа для запуска приложения на production сервере (gunicorn)
"""
from app import app

if __name__ == '__main__':
    app.run()

