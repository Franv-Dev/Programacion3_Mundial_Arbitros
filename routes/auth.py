from flask import Blueprint, request, jsonify
from werkzeug.security import check_password_hash, generate_password_hash
from db import db
from models.user import User
from config import Config
import jwt
import datetime

# Tu Blueprint adaptado para la API
auth_bp = Blueprint("auth", __name__, url_prefix="/api/auth")

# Registrar un Usuario
@auth_bp.route("/register", methods=["POST"]) # En una API REST, el registro siempre es POST
def register():
    # En vez de request.form, en una API recibimos JSON
    data = request.get_json()
    
    nombre = data.get("nombre")
    apellido = data.get("apellido")
    dni = data.get("dni")
    email = data.get("email")
    password = data.get("password")
    
    error = None

    # Tus mismas validaciones
    if not email:
        error = "Se requiere un email"
    elif not password:
        error = "Se requiere una contraseña"
    elif not dni:
        error = "Se requiere un DNI"

    # Verificamos si ya existe
    user_email = User.query.filter_by(_email=email).first()
    user_dni = User.query.filter_by(_dni=dni).first()

    if user_email is not None:
        error = f"El email: {email} ya se encuentra registrado"
    elif user_dni is not None:
        error = f"El DNI {dni} ya se encuentra registrado"

    # Si no hay errores, guardamos igual que en tu ejemplo
    if error is None:
        nuevo_usuario = User(
            _nombre=nombre,
            _apellido=apellido,
            _dni=dni,
            _email=email,
            password=password # El setter del modelo encripta esto automáticamente
        )
        db.session.add(nuevo_usuario)
        db.session.commit()
        
        # En vez de redirect, devolvemos un JSON de éxito
        return jsonify({"mensaje": "Usuario registrado correctamente"}), 201

    # Si hubo error, devolvemos un JSON con el error
    return jsonify({"error": error}), 400


# Iniciar Sesion
@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")
    
    error = None
    
    # Tu misma lógica de búsqueda
    user = User.query.filter_by(_email=email).first()

    if user is None:
        error = "El email es incorrecto"
    elif not user.check_password(password):
        error = "La contraseña es incorrecta"

    if error is None:
        # En vez de guardar en 'session' (que usa cookies tradicionales), 
        # generamos el JWT para que React lo guarde y lo use.
        token = jwt.encode({
            'user_id': user.id,
            'email': user.email,
            'rol': user.rol,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=2)
        }, Config.JWT_SECRET_KEY, algorithm="HS256")

        return jsonify({
            "mensaje": "Login exitoso",
            "token": token,
            "usuario": user.to_dict()
        }), 200
        
    return jsonify({"error": error}), 401