from db import db
from models.persons import Person

class Referee(Person):
    __tablename__ = 'referees'

    _nationality = db.Column("nationality", db.String(50), nullable=False)
    _matches_officiated = db.Column("matches_officiated", db.Integer, default=0)
    _yellow_cards_given = db.Column("yellow_cards_given", db.Integer, default=0)
    _red_cards_given = db.Column("red_cards_given", db.Integer, default=0)
    _image_url = db.Column("image_url", db.String(255), nullable=True, default=None)

    @property
    def nationality(self): return self._nationality

    @property
    def statistics(self):
        return {
            "matches_officiated": self._matches_officiated,
            "yellow_cards_given": self._yellow_cards_given,
            "red_cards_given": self._red_cards_given
        }
    

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "lastName": self.lastName,
            "nationality": self.nationality,
            "statistics": self.statistics,
            "image_url": self._image_url
        }

