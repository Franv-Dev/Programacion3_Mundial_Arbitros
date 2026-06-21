from db import db
from models.persons import Person
from werkzeug.security import generate_password_hash, check_password_hash

class User(Person):
    # Herencia: Ya tiene id, nombre, apellido y dni por heredar de Person
    __tablename__ = "usuarios"

    _email = db.Column("email", db.String(150), unique=True, nullable=False)
    _password_hash = db.Column("password_hash", db.String(255), nullable=False)
    _rol = db.Column("rol", db.String(50), default="Users", nullable=False)

    @property
    def email(self): return self._email

    @property
    def rol(self): return self._rol

    # Setter mágico para la contraseña (Encapsulamiento puro)
    @property
    def password(self):
        raise AttributeError("La contraseña no se puede leer directamente")

    @password.setter
    def password(self, password_plana):
        self._password_hash = generate_password_hash(password_plana)

    def check_password(self, password_ingresada):
        return check_password_hash(self._password_hash, password_ingresada)

    # Polimorfismo: Reescribimos to_dict
    def to_dict(self):
        return {
            "id": self.id,
            "nombre": self.nombre,
            "apellido": self.apellido,
            "dni": self.dni,
            "email": self.email,
            "rol": self.rol
        }