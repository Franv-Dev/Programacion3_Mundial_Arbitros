import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    PORT = int(os.environ.get('PORT', 5000))
    DEBUG = os.environ.get('FLASK_DEBUG', 'True') == 'True'
    
    user = os.environ.get('DB_USER', 'root')
    password = os.environ.get('DB_PASSWORD', '')
    host = os.environ.get('DB_HOST', 'localhost')
    db_name = os.environ.get('DB_NAME', 'mundial2026')
    
    
    SQLALCHEMY_DATABASE_URI = f"mysql+pymysql://{user}:{password}@{host}:3306/{db_name}"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY', 'clave_mundial_2026')