from flask import Flask
from flask_cors import CORS
from config import Config
from db import db

# Importar Rutas
from routes.auth import auth_bp
from routes.referees import referees_bp

# Importar todos los modelos antes del create_all()
from models.user import User
from models.admin import Admin
from models.referee import Referee

app = Flask(__name__)
app.config.from_object(Config)

# Inicializar complementos
CORS(app)
db.init_app(app)

# Registrar Blueprints 
app.register_blueprint(auth_bp)
app.register_blueprint(referees_bp)

# Crear las tablas automáticamente
with app.app_context():
    db.create_all()

@app.route('/', methods=['GET'])
def home():
    return {"mensaje": "API del Mundial 2026 funcionando con ORM - impulsarStudio"}

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=app.config.get('PORT', 5000), debug=app.config.get('DEBUG', True))