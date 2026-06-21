from flask import Flask
from flask_cors import CORS
from config import Config
from db import db
from routes.auth import auth_bp

app = Flask(__name__)

# Cargar configuración
app.config.from_object(Config)

# Habilitar CORS
CORS(app)

# Inicializar SQLAlchemy con la app
db.init_app(app)

# Registrar tus rutas de autenticación
app.register_blueprint(auth_bp, url_prefix='/api/auth')

# Con esto, SQLAlchemy crea las tablas si no existen
with app.app_context():
    db.create_all()

@app.route('/', methods=['GET'])
def home():
    return {"mensaje": "API del Mundial 2026 funcionando con ORM"}

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=app.config['PORT'], debug=app.config['DEBUG'])