from flask import Blueprint, request, jsonify
from werkzeug.security import check_password_hash, generate_password_hash
from db import db
from models.user import User
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
    dni = data.get("dni")
    gmail = data.get("gmail")
    password = data.get("password")
    
    error = None

    if not gmail:
        error = "Se requiere un email"
    elif not password:
        error = "Se requiere una contraseña"
    elif not dni:
        error = "Se requiere un DNI"

    # Verificacion
    user_gmail = User.query.filter_by(_gmail=gmail).first()
    user_dni = User.query.filter_by(_dni=dni).first()

    if user_gmail is not None:
        error = f"El email: {gmail} ya se encuentra registrado"
    elif user_dni is not None:
        error = f"El DNI {dni} ya se encuentra registrado"

    
    if error is None:
        new_user = User(
            _name=name,
            _lastName=lastName,
            _dni=dni,
            _gmail=gmail,
            password=password 
        )
        db.session.add(new_user)
        db.session.commit()
        
        
        return jsonify({"mensaje": "Usuario registrado correctamente"}), 201

    
    return jsonify({"error": error}), 400


# Iniciar Sesion
@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    gmail = data.get("gmail")
    password = data.get("password")
    
    error = None
    
    
    user = User.query.filter_by(_gmail=gmail).first()

    if user is None:
        error = "El email es incorrecto"
    elif not user.check_password(password):
        error = "La contraseña es incorrecta"

    if error is None:

        token = jwt.encode({
            'user_id': user.id,
            'gmail': user.gmail,
            'rol': user.rol,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=2)
        }, Config.JWT_SECRET_KEY, algorithm="HS256")

        return jsonify({
            "mensaje": "Login exitoso",
            "token": token,
            "usuario": user.to_dict()
        }), 200
        
    return jsonify({"error": error}), 401