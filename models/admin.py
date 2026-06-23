from db import db
from models.persons import Person
from werkzeug.security import generate_password_hash, check_password_hash

class Admin(Person):
    __tablename__ = "admins"

    _gmail = db.Column("gmail", db.String(150), unique=True, nullable=False)
    _password_hash = db.Column("password_hash", db.String(255), nullable=False)

    @property
    def gmail(self): return self._gmail


    @property
    def role(self): return "Admin"

    @property
    def password(self):
        raise AttributeError("La contraseña no se puede leer directamente")

    @password.setter
    def password(self, password_plana):
        self._password_hash = generate_password_hash(password_plana)

    def check_password(self, password_ingresada):
        return check_password_hash(self._password_hash, password_ingresada)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "lastName": self.lastName,
            "gmail": self.gmail,
            "role": self.role
        }
