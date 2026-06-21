from db import db

class Person(db.Model):
    __abstract__ = True 

    id = db.Column(db.Integer, primary_key=True)
    _nombre = db.Column("nombre", db.String(100), nullable=False)
    _apellido = db.Column("apellido", db.String(100), nullable=False)
    _dni = db.Column("dni", db.String(20), unique=True, nullable=False)

    @property
    def nombre(self): return self._nombre

    @property
    def apellido(self): return self._apellido

    @property
    def dni(self): return self._dni

    def to_dict(self):
        raise NotImplementedError("Las clases hijas deben implementar este método")