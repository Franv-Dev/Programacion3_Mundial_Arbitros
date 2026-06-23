from db import db
from models.persons import Person

class Referee(Person):
    __tablename__ = 'referees'

    _nationality = db.Column("nationality", db.String(50), nullable=False)
    _matches_officiated = db.Column("matches_officiated", db.Integer, default=0)
    _yellow_cards_given = db.Column("yellow_cards_given", db.Integer, default=0)
    _red_cards_given = db.Column("red_cards_given", db.Integer, default=0)
    _image_url = db.Column("image_url", db.String(255), nullable=True, default=None)
    _age = db.Column("age", db.Integer, nullable=True)
    _years_refereeing = db.Column("years_refereeing", db.Integer, nullable=True)
    _sanctions = db.Column("sanctions", db.Integer, default=0)

    @property
    def nationality(self): return self._nationality

    @property
    def age(self): return self._age

    @property
    def yearsRefereeing(self): return self._years_refereeing

    @property
    def sanctions(self): return self._sanctions

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
            "matchesOfficiated": self._matches_officiated,
            "yellowCards": self._yellow_cards_given,
            "redCards": self._red_cards_given,
            "imageUrl": self._image_url,
            "age": self.age,
            "yearsRefereeing": self.yearsRefereeing,
            "sanctions": self.sanctions
        }
