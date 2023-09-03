# BASE DE DATOS POSTGRES

Instalar la version 4.20.1 o superior de Docker Desktop y levantar el mismo.

Entrar a la consola (PowerShell) de su computadora y dar el siguiente comando, el cual bajara, instalara y hara correr postgres con el nombre mi-postgres en el puerto externo 54321:
docker run --name mi-postgres -e POSTGRES_PASSWORD=postgres -p 54321:5432 postgres

Dar el el siguiente comando para asegurarse que postgres esta corriendo:
docker ps

Despues de dar el comando docker ps, el resutado deberia parecerse a lo siguiente:
CONTAINER ID IMAGE COMMAND CREATED STATUS PORTS NAMES
1ab05c84e383 postgres "docker-entrypoint.s…" 6 days ago Up 3 hours 0.0.0.0:54321->5432/tcp mi-postgres

Nota: 1ab05c84e383 es el ID del contendedor donde esta corriendo el servidor Postgress. En su caso este ID sera diferente.

Dar el siguiente comando para ingresar al servidor Postgres:
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

Instalar NodeJS v20.3.0 en su computadora.
Instalar npm 9.6.7 en su computadora.

En su computadora crear una carpeta con el nombre api-rest-js (el nombre de la carpeta es solo un ejemplo, puede usar otro nombre).
Bajar a la carpeta api-rest-js el archivo index.js desde el repositorio publico https://github.com/mwfernandezm/api-rest-js.git

Instalar Visual Studio Code (VSC) en su computadora y en la terminal del VSC ir a la carpeta api-rest-js y dar el siguiente comando que permitira inicializar el manejador de paquetes de Node.
npm init

Luego dar el comando el siguiente comando para instalar el paquete Express que facilitara la publicacion de la aplicacion:
npm install express

Dar el siguiente comando para instalar el paquete pg que permitara conectarse a la base de datos Postgres desde la aplicacion:
npm install pg

En la terminal del VSC dar el siguiente comando para levantar el servidor Express en el puerto 3001
node index.js

Despues dar el comando node index.js, la terminal del VSC deberia mostrar ser el siguiente mensaje:
Este servidor se ejecuta en http://localhost:3001

# PRUEBA DE LA APLICACION

Instalar Postman y luego probar las siguientes rutas de la aplicacion:

    POST http://localhost:3001/usuarios para registrar un nuevo usuario a la tabla de usuarios
    GET http://localhost:3001//usuarios para visualizar  todos los usuarios existentes en la tabla usuarios
    GET http://localhost:3001/usuarios/promedio-edad para visualizar el promedio de edad de los usuarios
    GET http://localhost:3001/usuarios/1 para visualizar solo el 1er registro de la tabla de usuarios
    PUT http://localhost:3001/usuarios/1 para actualizar datos del 1er registro de la tabla de usuarios
    DELETE http://localhost:3001/usuarios/1 para borrar el 1er registro de la tabla de usuarios
    GET http://localhost:3001/estado para visualizar el estado de la API REST
