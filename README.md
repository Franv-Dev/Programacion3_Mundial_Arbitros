# 🏆 API REST - Mundial de Árbitros 2026
**Desarrollado por:** Mateo Gomez, Tomas Muñoz, Leandro Briceño,Villarroel Franco ,Proyecto de 3er Año

API RESTful desarrollada en **Python y Flask** para gestionar la información de los árbitros del Mundial 2026. Implementa Programación Orientada a Objetos (POO), herencia de clases y un ORM (SQLAlchemy) para la base de datos MySQL.

## 👥 Equipo de Desarrollo

* **Franco Villarroel:** Arquitectura de base de datos, modelado POO, configuración de SQLAlchemy, sistema de seguridad JWT, roles (RBAC) y script seeder del Administrador.
* **Leandro:** Desarrollo lógico del CRUD de Árbitros, estructuración de rutas (`referees.py`), manejo de validaciones y estadísticas.

## Arquitectura y Seguridad
* **POO:** Clase abstracta `Person` de la cual heredan `User`, `Admin` y `Referee`.
* **Seguridad:** Autenticación mediante **JSON Web Tokens (JWT)**. Las rutas de modificación están protegidas por un decorador personalizado (`@admin_required`).
* **Seeder:** El Administrador principal se genera por consola (`crear_admin.py`) por seguridad; el registro público solo crea usuarios estándar.
* <img width="1536" height="1024" alt="diagrama de clases" src="https://github.com/user-attachments/assets/1df2dabe-aac6-43e6-ac19-34df4dfce9cd" />
