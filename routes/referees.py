from flask import Blueprint, request, jsonify
from db import db
from models.referee import Referee
from config import Config
import jwt
from functools import wraps

referees_bp = Blueprint("referees", __name__, url_prefix="/api/referees")

# 1. El Middleware (Decorador) de Seguridad
def admin_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        auth_header = request.headers.get("Authorization")
        if not auth_header:
            return jsonify({"error": "Token de autenticación requerido"}), 401

        # El front manda "Bearer <token>", necesitamos separarlo
        try:
            token = auth_header.split(" ")[1] if "Bearer " in auth_header else auth_header
        except IndexError:
            return jsonify({"error": "Formato de token inválido"}), 401

        try:
            # Usamos JWT_SECRET_KEY igual que en auth.py
            decoded_token = jwt.decode(token, Config.JWT_SECRET_KEY, algorithms=["HS256"])
            
            # Buscamos 'rol' igual a 'Admin'
            if decoded_token.get("rol") != "Admin":
                return jsonify({"error": "Acceso denegado. Se requiere privilegios de administrador."}), 403
                
        except jwt.ExpiredSignatureError:
            return jsonify({"error": "Token expirado"}), 401
        except jwt.InvalidTokenError:
            return jsonify({"error": "Token inválido"}), 401

        return f(*args, **kwargs)

    return decorated_function

# 2. El GET para que  puedan ver los árbitros
@referees_bp.route("/", methods=["GET"])
def get_referees():
    referees = Referee.query.all()
    # Reutilizamos la función to_dict() del modelo
    return jsonify([referee.to_dict() for referee in referees]), 200

# 3. El CRUD protegido para el Admin
@referees_bp.route("/", methods=["POST"])
@admin_required
def create_referee():
    data = request.get_json()
    
    name = data.get("name")
    last_name = data.get("lastName")
    nationality = data.get("nationality")
    
    # las estadísticas y la imagen si no vienen, por defecto son 0 o None
    matches = data.get("matches_officiated", 0)
    yellows = data.get("yellow_cards_given", 0)
    reds = data.get("red_cards_given", 0)
    image_url = data.get("image_url")

    if not all([name, last_name, nationality]):
        return jsonify({"error": "Faltan campos requeridos (nombre, apellido, nacionalidad)"}), 400

    new_referee = Referee(
        _name=name,
        _lastName=last_name,
        _nationality=nationality,
        _matches_officiated=matches,
        _yellow_cards_given=yellows,
        _red_cards_given=reds,
        _image_url=image_url
    )
    db.session.add(new_referee)
    db.session.commit()

    return jsonify(new_referee.to_dict()), 201

@referees_bp.route("/", methods=["PUT"])
@admin_required
def update_referee():
    data = request.get_json()
    referee_id = data.get("id")

    if not referee_id:
        return jsonify({"error": "ID del árbitro requerido"}), 400

    referee = Referee.query.get(referee_id)
    if not referee:
        return jsonify({"error": "Árbitro no encontrado"}), 404

    # Actualizamos los datos. Si no vienen en el JSON, dejamos los que ya estaban
    referee._name = data.get("name", referee._name)
    referee._lastName = data.get("lastName", referee._lastName)
    referee._nationality = data.get("nationality", referee._nationality)
    referee._matches_officiated = data.get("matches_officiated", referee._matches_officiated)
    referee._yellow_cards_given = data.get("yellow_cards_given", referee._yellow_cards_given)
    referee._red_cards_given = data.get("red_cards_given", referee._red_cards_given)
    referee._image_url = data.get("image_url", referee._image_url)

    db.session.commit()

    return jsonify(referee.to_dict()), 200

@referees_bp.route("/<int:referee_id>", methods=["DELETE"])
@admin_required
def delete_referee(referee_id):
    referee = Referee.query.get(referee_id)
    if not referee:
        return jsonify({"error": "Árbitro no encontrado"}), 404

    db.session.delete(referee)
    db.session.commit()

    return jsonify({"mensaje": "Árbitro eliminado correctamente"}), 200


