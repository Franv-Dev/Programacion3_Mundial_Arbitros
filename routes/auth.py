from flask import Blueprint, request, jsonify
from werkzeug.security import check_password_hash, generate_password_hash
from db import db
from models.user import User
from models.admin import Admin
from config import Config
import jwt
import datetime

auth_bp = Blueprint("auth", __name__, url_prefix="/api/auth")

# Registrar un Usuario
@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.get_json()

    name = data.get("name")
    lastName = data.get("lastName")
    gmail = data.get("gmail")
    password = data.get("password")

    error = None

    # 1. Validaciones rápidas (limpiamos las repeticiones)
    if not gmail:
        error = "Se requiere un email"
    elif not password:
        error = "Se requiere una contraseña"
    elif len(password) < 8:
        error = "La contraseña debe tener al menos 8 caracteres"
    elif not any(char.isdigit() for char in password):
        error = "La contraseña debe contener al menos un número"

    # 2. Verificación en la Base de Datos (User y Admin)
    if error is None:
        if User.query.filter_by(_gmail=gmail).first() or Admin.query.filter_by(_gmail=gmail).first():
            error = f"El email {gmail} ya se encuentra registrado"

    # 3. Guardado en la base de datos
    if error is None:
        new_user = User(
            _name=name,
            _lastName=lastName,
            _gmail=gmail,
            password=password
        )
        db.session.add(new_user)
        db.session.commit()

        return jsonify({"message": "Usuario registrado correctamente"}), 201

    return jsonify({"error": error}), 400


# Iniciar Sesion
@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    gmail = data.get("gmail")
    password = data.get("password")

    error = None

    # 1. Buscar PRIMERO si el que entra es el Administrador
    account = Admin.query.filter_by(_gmail=gmail).first()

    # 2. Si no es Admin, buscar si es un Usuario común
    if not account:
        account = User.query.filter_by(_gmail=gmail).first()

    # 3. Validaciones de acceso
    if account is None:
        error = "El email es incorrecto o no está registrado"
    elif not account.check_password(password):
        error = "La contraseña es incorrecta"

    # 4. Generación del JWT
    if error is None:
        token = jwt.encode({
            'user_id': account.id,
            'gmail': account.gmail,
            'role': account.role, # Extrae automáticamente si es 'Admin' o 'Users'
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=2)
        }, Config.JWT_SECRET_KEY, algorithm="HS256")

        return jsonify({
            "message": "Login exitoso",
            "token": token,
            "usuario": account.to_dict()
        }), 200

    return jsonify({"error": error}), 401
