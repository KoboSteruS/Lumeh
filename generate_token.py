"""
Скрипт для генерации JWT токена для доступа к админ-панели
"""
import jwt
import os
from datetime import datetime, timedelta

SECRET_KEY = os.environ.get('SECRET_KEY', 'dev-secret-key-change-in-production')

def generate_token(expires_days=365):
    """Генерирует JWT токен с указанным сроком действия"""
    payload = {
        'admin': True,
        'exp': datetime.utcnow() + timedelta(days=expires_days),
        'iat': datetime.utcnow()
    }
    
    token = jwt.encode(payload, SECRET_KEY, algorithm='HS256')
    return token

if __name__ == '__main__':
    token = generate_token()
    print(f"\nJWT токен для админ-панели:")
    print(f"{token}\n")
    print(f"URL для доступа к админ-панели:")
    print(f"http://your-ip:5000/{token}/admin\n")
    print(f"Или локально:")
    print(f"http://localhost:5000/{token}/admin\n")

