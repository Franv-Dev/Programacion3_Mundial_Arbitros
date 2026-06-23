from app import app
from db import db
from models.admin import Admin

def generar_admin():
    with app.app_context():
        # Revisa si ya existe para no duplicarlo
        if not Admin.query.filter_by(_gmail="admin@impulsarstudio.com").first():
            nuevo_admin = Admin(
                _name="Admin",
                _lastName="Principal",
                _gmail="admin@impulsarstudio.com",
                password="adminpassword123"
            )
            db.session.add(nuevo_admin)
            db.session.commit()
            print("Administrador listo: admin@impulsarstudio.com / adminpassword123")
        else:
            print(" El administrador ya existe.")

if __name__ == "__main__":
    generar_admin()