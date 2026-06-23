🏆 Mundial de Árbitros 2026
Desarrollado por: Mateo Gómez, Tomás Muñoz, Leandro Briceño, Franco Villarroel — Proyecto 3er Año IES 9-023

Aplicación web completa para consultar el perfil y estadísticas de los árbitros del Mundial de Fútbol 2026. Desarrollada con React en el frontend y Flask en el backend, con autenticación JWT, roles de usuario y panel de administración.


👥 Equipo de Desarrollo
Franco Villarroel — Backend Arquitectura de base de datos, modelado POO, configuración de SQLAlchemy, sistema de seguridad JWT, roles (RBAC) y script de creación del administrador.

Leandro Briceño — Backend Desarrollo del CRUD de árbitros, estructuración de rutas (referees.py), manejo de validaciones y estadísticas.

Tomás Muñoz — Frontend Sistema de autenticación (Login, Register, Logout), AuthContext, ProtectedRoute,  custom hook useFetch, diseño de la página de inicio con estadísticas generales.

Mateo Gómez — Frontend Módulo de árbitros: tarjetas interactivas (RefereeCard), modal de perfil (RefereeModal), grilla de cartas, panel CRUD para administradores, conexión con la API REST, seed de 40 árbitros reales del Mundial 2026.


🛠 Tecnologías
Frontend

React + Vite
Material UI v9
React Router v7
Fetch API (custom hook useFetch)

Backend

Python + Flask
SQLAlchemy + PyMySQL
MySQL
JWT (PyJWT)


🏗 Arquitectura y Seguridad
POO: Clase abstracta Person de la cual heredan User, Admin y Referee.
Seguridad: Autenticación mediante JWT. Las rutas de modificación están protegidas por el decorador @admin_required.
Roles: Admin puede crear, editar y eliminar árbitros. User solo puede consultar.
Seeder: El administrador se genera por consola (crear_admin.py); el registro público solo crea usuarios estándar.


📐 Diagrama de Clases
 
🚀 Instalación
Requisitos previos
Node.js 18+
Python 3.10+
MySQL 8+
Base de datos
Crear una base de datos llamada mundial2026 en MySQL
Ejecutar el backend una vez — SQLAlchemy crea las tablas automáticamente
Backend
pip install -r requirements.txt

Crear archivo .env en la raíz:

DB_USER=root

DB_PASSWORD=tu_contraseña

DB_HOST=localhost

DB_NAME=mundial2026

JWT_SECRET_KEY=clave_secreta_larga

FLASK_DEBUG=True

PORT=5000

Levantar el servidor:

python app.py

Cargar los 40 árbitros del Mundial 2026:

python seed_referees.py

Crear usuario administrador:

python crear_admin.py
Frontend
npm install

npm run dev

Abrir http://localhost:5173


🔑 Credenciales de prueba
Rol
Email
Contraseña
Admin
admin@gmail.com
1234
Usuario
registrarse desde la app
—



📁 Estructura del proyecto
/

├── app.py                  # Servidor Flask principal

├── config.py               # Configuración y variables de entorno

├── db.py                   # Conexión a base de datos

├── models/

│   ├── persons.py          # Clase abstracta Person

│   ├── user.py             # Modelo User (hereda Person)

│   ├── admin.py            # Modelo Admin (hereda Person)

│   └── referee.py          # Modelo Referee

├── routes/

│   ├── auth.py             # Endpoints de autenticación

│   └── referees.py         # Endpoints CRUD de árbitros

├── seed_referees.py        # Carga 40 árbitros reales del Mundial 2026

├── crear_admin.py          # Crea usuario administrador

└── src/

    ├── components/

    │   ├── Navbar.jsx          # Barra de navegación con auth condicional

    │   ├── RefereeCard.jsx     # Tarjeta de árbitro en forma de rombo

    │   ├── RefereeModal.jsx    # Modal con perfil y estadísticas

    │   ├── RefereeGrid.jsx     # Grilla de tarjetas

    │   ├── RefereeForm.jsx     # Formulario CRUD (solo Admin)

    │   ├── StatsBar.jsx        # Barra de estadísticas generales

    │   ├── CountryFlag.jsx     # Bandera por CSS gradient

    │   ├── StatTile.jsx        # Tile de estadística

    │   ├── InfoTile.jsx        # Tile de información

    │   └── PageHeader.jsx      # Encabezado de página

    ├── context/

    │   └── AuthContext.jsx     # Contexto global de autenticación

    ├── hooks/

    │   └── useFetch.js         # Custom hook para consumo de API

    ├── pages/

    │   ├── Referees.jsx        # Página principal de árbitros (protegida)

    │   ├── Login.jsx           # Inicio de sesión

    │   └── Register.jsx        # Registro de usuario

    └── theme/

        └── tokens.js           # Paleta de colores del tema


📡 Endpoints de la API
Auth
Método
Endpoint
Descripción
Body
POST
/api/auth/register
Registro de usuario
{ name, lastName, gmail, password }
POST
/api/auth/login
Login, devuelve JWT
{ gmail, password }

Árbitros
Método
Endpoint
Auth requerida
Descripción
GET
/api/referees/
Pública
Lista todos los árbitros
POST
/api/referees/
Admin
Crear nuevo árbitro
PUT
/api/referees/
Admin
Editar árbitro existente
DELETE
/api/referees/<id>
Admin
Eliminar árbitro

Ejemplo de respuesta GET /api/referees/
[

  {

    "id": 1,

    "name": "Facundo",

    "lastName": "Tello",

    "nationality": "Argentina",

    "age": 40,

    "yearsRefereeing": 15,

    "matchesOfficiated": 1,

    "yellowCards": 5,

    "redCards": 0,

    "sanctions": 0,

    "imageUrl": null

  }

]
