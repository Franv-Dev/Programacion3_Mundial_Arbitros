from db import db

class Person(db.Model):
    __abstract__ = True 

    id = db.Column(db.Integer, primary_key=True)
    _name = db.Column("name", db.String(100), nullable=False)
    _lastName = db.Column("lastName", db.String(100), nullable=False)
    _dni = db.Column("dni", db.String(20), unique=True, nullable=False)

    @property
    def name(self): return self._name

    @property
    def lastName(self): return self._lastName

    @property
    def dni(self): return self._dni

    def to_dict(self):
        raise NotImplementedError("Las clases hijas deben implementar este método")