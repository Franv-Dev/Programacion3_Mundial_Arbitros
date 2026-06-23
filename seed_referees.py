from app import app
from db import db
from models.referee import Referee

referees_data = [
    {"name": "Michael", "lastName": "Oliver", "nationality": "England", "age": 40, "yearsRefereeing": 13, "matchesOfficiated": 2, "yellowCards": 4, "redCards": 0, "sanctions": 0, "imageUrl": None},
    {"name": "Ramon", "lastName": "Abatti", "nationality": "Brazil", "age": 44, "yearsRefereeing": 10, "matchesOfficiated": 1, "yellowCards": 4, "redCards": 0, "sanctions": 0, "imageUrl": None},
    {"name": "Abdulrahman", "lastName": "Al Jassim", "nationality": "Qatar", "age": 43, "yearsRefereeing": 12, "matchesOfficiated": 1, "yellowCards": 4, "redCards": 0, "sanctions": 0, "imageUrl": None},
    {"name": "Pierre", "lastName": "Atcho", "nationality": "Gabon", "age": 38, "yearsRefereeing": 8, "matchesOfficiated": 1, "yellowCards": 1, "redCards": 0, "sanctions": 0, "imageUrl": None},
    {"name": "Ivan", "lastName": "Barton", "nationality": "El Salvador", "age": 37, "yearsRefereeing": 9, "matchesOfficiated": 1, "yellowCards": 0, "redCards": 0, "sanctions": 0, "imageUrl": None},
    {"name": "Dahane", "lastName": "Beida", "nationality": "Mauritania", "age": 36, "yearsRefereeing": 7, "matchesOfficiated": 1, "yellowCards": 1, "redCards": 0, "sanctions": 0, "imageUrl": None},
    {"name": "Juan Gabriel", "lastName": "Benitez", "nationality": "Paraguay", "age": 41, "yearsRefereeing": 10, "matchesOfficiated": 1, "yellowCards": 0, "redCards": 0, "sanctions": 0, "imageUrl": None},
    {"name": "Ismail", "lastName": "Elfath", "nationality": "United States", "age": 43, "yearsRefereeing": 11, "matchesOfficiated": 1, "yellowCards": 3, "redCards": 0, "sanctions": 0, "imageUrl": None},
    {"name": "Alireza", "lastName": "Faghani", "nationality": "Australia", "age": 47, "yearsRefereeing": 15, "matchesOfficiated": 1, "yellowCards": 0, "redCards": 0, "sanctions": 0, "imageUrl": None},
    {"name": "Yael", "lastName": "Falcon Perez", "nationality": "Argentina", "age": 41, "yearsRefereeing": 9, "matchesOfficiated": 1, "yellowCards": 1, "redCards": 0, "sanctions": 0, "imageUrl": None},
    {"name": "Cristian", "lastName": "Garay", "nationality": "Chile", "age": 40, "yearsRefereeing": 10, "matchesOfficiated": 1, "yellowCards": 0, "redCards": 2, "sanctions": 0, "imageUrl": None},
    {"name": "Mustapha", "lastName": "Ghorbal", "nationality": "Algeria", "age": 42, "yearsRefereeing": 11, "matchesOfficiated": 1, "yellowCards": 4, "redCards": 0, "sanctions": 0, "imageUrl": None},
    {"name": "Alejandro", "lastName": "Hernandez", "nationality": "Spain", "age": 46, "yearsRefereeing": 14, "matchesOfficiated": 1, "yellowCards": 0, "redCards": 0, "sanctions": 0, "imageUrl": None},
    {"name": "Jalal", "lastName": "Jayed", "nationality": "Bahrain", "age": 38, "yearsRefereeing": 8, "matchesOfficiated": 1, "yellowCards": 0, "redCards": 0, "sanctions": 0, "imageUrl": None},
    {"name": "Istvan", "lastName": "Kovacs", "nationality": "Romania", "age": 40, "yearsRefereeing": 11, "matchesOfficiated": 1, "yellowCards": 0, "redCards": 0, "sanctions": 0, "imageUrl": None},
    {"name": "Francois", "lastName": "Letexier", "nationality": "France", "age": 35, "yearsRefereeing": 8, "matchesOfficiated": 1, "yellowCards": 4, "redCards": 0, "sanctions": 0, "imageUrl": None},
    {"name": "Ma", "lastName": "Ning", "nationality": "China", "age": 44, "yearsRefereeing": 12, "matchesOfficiated": 1, "yellowCards": 0, "redCards": 0, "sanctions": 0, "imageUrl": None},
    {"name": "Adham", "lastName": "Makhadmeh", "nationality": "Jordan", "age": 39, "yearsRefereeing": 9, "matchesOfficiated": 1, "yellowCards": 2, "redCards": 0, "sanctions": 0, "imageUrl": None},
    {"name": "Danny", "lastName": "Makkelie", "nationality": "Netherlands", "age": 42, "yearsRefereeing": 13, "matchesOfficiated": 1, "yellowCards": 6, "redCards": 0, "sanctions": 0, "imageUrl": None},
    {"name": "Szymon", "lastName": "Marciniak", "nationality": "Poland", "age": 45, "yearsRefereeing": 14, "matchesOfficiated": 1, "yellowCards": 0, "redCards": 0, "sanctions": 0, "imageUrl": None},
    {"name": "Maurizio", "lastName": "Mariani", "nationality": "Italy", "age": 46, "yearsRefereeing": 13, "matchesOfficiated": 1, "yellowCards": 1, "redCards": 0, "sanctions": 0, "imageUrl": None},
    {"name": "Hector", "lastName": "Martinez", "nationality": "Honduras", "age": 38, "yearsRefereeing": 9, "matchesOfficiated": 1, "yellowCards": 3, "redCards": 0, "sanctions": 0, "imageUrl": None},
    {"name": "Glenn", "lastName": "Nyberg", "nationality": "Sweden", "age": 41, "yearsRefereeing": 10, "matchesOfficiated": 1, "yellowCards": 3, "redCards": 0, "sanctions": 0, "imageUrl": None},
    {"name": "Amin", "lastName": "Mohamed Omar", "nationality": "Egypt", "age": 44, "yearsRefereeing": 11, "matchesOfficiated": 2, "yellowCards": 1, "redCards": 0, "sanctions": 0, "imageUrl": None},
    {"name": "Mary", "lastName": "Penso", "nationality": "Belize", "age": 43, "yearsRefereeing": 10, "matchesOfficiated": 1, "yellowCards": 0, "redCards": 0, "sanctions": 0, "imageUrl": None},
    {"name": "Wilton", "lastName": "Sampaio", "nationality": "Brazil", "age": 43, "yearsRefereeing": 12, "matchesOfficiated": 1, "yellowCards": 3, "redCards": 3, "sanctions": 0, "imageUrl": None},
    {"name": "Cesar", "lastName": "Ramos", "nationality": "Mexico", "age": 41, "yearsRefereeing": 11, "matchesOfficiated": 1, "yellowCards": 1, "redCards": 0, "sanctions": 0, "imageUrl": None},
    {"name": "Joao Pedro", "lastName": "Silva Pinheiro", "nationality": "Portugal", "age": 40, "yearsRefereeing": 10, "matchesOfficiated": 1, "yellowCards": 0, "redCards": 1, "sanctions": 0, "imageUrl": None},
    {"name": "Ilgiz", "lastName": "Tantashev", "nationality": "Uzbekistan", "age": 39, "yearsRefereeing": 9, "matchesOfficiated": 1, "yellowCards": 0, "redCards": 0, "sanctions": 0, "imageUrl": None},
    {"name": "Anthony", "lastName": "Taylor", "nationality": "England", "age": 46, "yearsRefereeing": 14, "matchesOfficiated": 1, "yellowCards": 2, "redCards": 0, "sanctions": 0, "imageUrl": None},
    {"name": "Gustavo", "lastName": "Tejera", "nationality": "Uruguay", "age": 38, "yearsRefereeing": 8, "matchesOfficiated": 1, "yellowCards": 0, "redCards": 0, "sanctions": 0, "imageUrl": None},
    {"name": "Facundo", "lastName": "Tello", "nationality": "Argentina", "age": 40, "yearsRefereeing": 15, "matchesOfficiated": 1, "yellowCards": 5, "redCards": 0, "sanctions": 0, "imageUrl": None},
    {"name": "Clement", "lastName": "Turpin", "nationality": "France", "age": 43, "yearsRefereeing": 14, "matchesOfficiated": 1, "yellowCards": 0, "redCards": 0, "sanctions": 0, "imageUrl": None},
    {"name": "Jesus", "lastName": "Valenzuela", "nationality": "Venezuela", "age": 44, "yearsRefereeing": 13, "matchesOfficiated": 1, "yellowCards": 1, "redCards": 0, "sanctions": 0, "imageUrl": None},
    {"name": "Slavko", "lastName": "Vincic", "nationality": "Slovenia", "age": 45, "yearsRefereeing": 14, "matchesOfficiated": 2, "yellowCards": 2, "redCards": 0, "sanctions": 0, "imageUrl": None},
    {"name": "Felix", "lastName": "Zwayer", "nationality": "Germany", "age": 44, "yearsRefereeing": 14, "matchesOfficiated": 1, "yellowCards": 7, "redCards": 0, "sanctions": 0, "imageUrl": None},
    {"name": "Dario", "lastName": "Herrera", "nationality": "Argentina", "age": 38, "yearsRefereeing": 8, "matchesOfficiated": 0, "yellowCards": 0, "redCards": 0, "sanctions": 0, "imageUrl": None},
    {"name": "Raphael", "lastName": "Claus", "nationality": "Brazil", "age": 44, "yearsRefereeing": 11, "matchesOfficiated": 0, "yellowCards": 0, "redCards": 0, "sanctions": 0, "imageUrl": None},
    {"name": "Tori", "lastName": "Penso", "nationality": "United States", "age": 40, "yearsRefereeing": 10, "matchesOfficiated": 0, "yellowCards": 0, "redCards": 0, "sanctions": 0, "imageUrl": None},
    {"name": "Felix", "lastName": "Brych", "nationality": "Germany", "age": 49, "yearsRefereeing": 17, "matchesOfficiated": 0, "yellowCards": 0, "redCards": 0, "sanctions": 0, "imageUrl": None},
]

with app.app_context():
    existing = Referee.query.count()
    if existing > 0:
        print(f"La base de datos ya tiene {existing} árbitros. No se insertó nada.")
    else:
        for r in referees_data:
            referee = Referee(
                _name=r["name"],
                _lastName=r["lastName"],
                _nationality=r["nationality"],
                _age=r["age"],
                _years_refereeing=r["yearsRefereeing"],
                _matches_officiated=r["matchesOfficiated"],
                _yellow_cards_given=r["yellowCards"],
                _red_cards_given=r["redCards"],
                _sanctions=r["sanctions"],
                _image_url=r["imageUrl"],
            )
            db.session.add(referee)
        db.session.commit()
        print(f"Se insertaron {len(referees_data)} árbitros correctamente.")
