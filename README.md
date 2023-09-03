# BASE DE DATOS POSTGRES

Instalar la version 4.20.1 o superior de Docker Desktop y levantar el mismo.

Entrar a la consola (PowerShell) de su computadora y dar el siguiente comando, el cual bajara, instalara y hara correr postgres con el nombre mi-postgres en el puerto externo 54321:
docker run --name mi-postgres -e POSTGRES_PASSWORD=postgres -p 54321:5432 postgres

Dar el el siguiente comando para asegurarse que postgres esta corriendo:
docker ps

Despues de dar el comando docker ps, el resutado deberia parecerse a lo siguiente:
CONTAINER ID IMAGE COMMAND CREATED STATUS PORTS NAMES
1ab05c84e383 postgres "docker-entrypoint.s…" 6 days ago Up 3 hours 0.0.0.0:54321->5432/tcp mi-postgres

Dar el siguiente comando para ingresar al servidor Postgres
docker exec -it mi-postgres psql -U postgres -W

Una vez ingresado al servidor Postgres, dar el siguiente comando para crear la base de datos personas_db
CREATE DATABASE personas_db

Instalar DBeaver y crear la conexion a la base de datos personas_db con los siguientes datos:

Host: localhost
Port: 54321
Database: usuarios_db
Username: postgres
Password: postgres

En DBveaver, en la base de datos personas_db dar boton derecho, ir al SQL Editor, luego dar Open SQL Script y dar los siguientes comandos para crear la tabla usuarios:

CREATE TABLE usuarios (
id SERIAL PRIMARY KEY,
cedula_identidad INTEGER NOT NULL,
nombre VARCHAR(50) NOT NULL,
primer_apellido VARCHAR(50) NOT NULL,
segundo_apellido VARCHAR(50) NOT NULL,
fecha_nacimiento DATE NOT NULL
);

En DBveaver, en la base de datos personas_db dar boton derecho, ir al SQL Editor, luego dar Open SQL Script y dar los siguientes comandos para insertar 3 registros a la tabla usuarios:

INSERT INTO usuarios (cedula_identidad, nombre, primer_apellido, segundo_apellido, fecha_nacimiento) VALUES
(3853123, 'Mario', 'Lopez', 'Vaca', '1971/09/21'),
(3853124, 'Juan', 'Perez', 'Losa', '1972/11/30'),
(3853125, 'Pedro', 'Martinez', 'Arevalo', '1973/10/20');

# LEVANTAR NODE Y EXPRESS

Instalar NodeJS v20.3.0
Instalar npm 9.6.7

Bajar de Github el repositorio
Entrar a la carpeta donde se encuentra el index.js
dar el comando npm init y creara el package.json

Dar el comando el siguiente comando para instalar el paquete Express que facilitar la publicacon de la aplicacion:
npm install express

Dar el coamndo el siguiente comando para instalar el paquete pg que permitara conectarse a la base de datos Postgres desde la aplicacion:
npm install pg

Instalar Visual Studio Code (VSC) y en la terminal de VSC dar el siguiente comando para levantar el servidor Express en el puerto 3001
node index.js

Despues dar el comando anterior, el resultado deberia ser el siguiente:
Este servidor se ejecuta en http://localhost:3001

# PRUEBA DE RUTAS

Instalar Postman y luego probar las siguientes rutas de la aplicacion:

    app.post("/usuarios", controller.addUsuario.bind(controller));
    app.get("/usuarios", controller.getUsuarios.bind(controller));
    app.get("/usuarios/promedio-edad", controller.promedio.bind(controller));
    app.get("/usuarios/:id_usuario", controller.getUsuarioById.bind(controller));
    app.put("/usuarios/:id_usuario", controller.updateUsuario.bind(controller));
    app.delete("/usuarios/:id_usuario", controller.deleteUsuario.bind(controller));
    app.get("/estado", controller.estado_api.bind(controller));
