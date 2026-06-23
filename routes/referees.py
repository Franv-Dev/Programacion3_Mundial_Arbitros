from flask import Blueprint, request, jsonify
from db import db
from models.referee import Referee
from config import Config
import jwt
from functools import wraps


referees_bp = Blueprint("referees", __name__, url_prefix="/api/referees")

@referees_bp.route("/", methods=["GET"])
def admin_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        token = request.headers.get("Authorization")
        if not token:
            return jsonify({"error": "Token de autenticación requerido"}), 401

        try:
            decoded_token = jwt.decode(token, Config.SECRET_KEY, algorithms=["HS256"])
            if not decoded_token.get("is_admin"):
                return jsonify({"error": "Acceso denegado. Se requiere privilegios de administrador."}), 403
        except jwt.ExpiredSignatureError:
            return jsonify({"error": "Token expirado"}), 401
        except jwt.InvalidTokenError:
            return jsonify({"error": "Token inválido"}), 401

        return f(*args, **kwargs)

    return decorated_function

@referees_bp.route("/", methods=["POST"])
@admin_required
def create_referee():
    data = request.get_json()
    
    name = data.get("name")
    last_name = data.get("lastName")
    dni = data.get("dni")
    nationality = data.get("nationality")
    image_url = data.get("image_url")

    if not all([name, last_name, dni, nationality]):
        return jsonify({"error": "Faltan campos requeridos"}), 400

    new_referee = Referee(
        _name=name,
        _lastName=last_name,
        _dni=dni,
        _nationality=nationality,
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

    referee._name = data.get("name", referee._name)
    referee._lastName = data.get("lastName", referee._lastName)
    referee._dni = data.get("dni", referee._dni)
    referee._nationality = data.get("nationality", referee._nationality)
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





