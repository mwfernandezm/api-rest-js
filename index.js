const express = require("express");
const { Pool } = require("pg");

const app = express();
const port = 3001;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "personas_db",
  password: "postgres",
  port: "54321",
});

// Modelo
class Model {
  async addUsuario(
    cedula_identidad,
    nombre,
    primer_apellido,
    segundo_apellido,
    fecha_nacimiento
  ) {
    await pool.query(
      "INSERT INTO usuarios (cedula_identidad, nombre, primer_apellido, segundo_apellido, fecha_nacimiento) values ($1, $2, $3, $4, $5)",
      [
        cedula_identidad,
        nombre,
        primer_apellido,
        segundo_apellido,
        fecha_nacimiento,
      ]
    );
  }
  async getUsuarios() {
    const { rows } = await pool.query("select * from usuarios;");
    return rows;
  }
  async getUsuarioById(id) {
    const { rows } = await pool.query("select * from usuarios where id = $1;", [
      id,
    ]);
    return rows[0];
  }
  async updateUsuario(
    id,
    cedula_identidad,
    nombre,
    primer_apellido,
    segundo_apellido,
    fecha_nacimiento
  ) {
    await pool.query(
      "UPDATE usuarios SET cedula_identidad = $2, nombre= $3, primer_apellido = $4, segundo_apellido = $5, fecha_nacimiento = $6 WHERE id = $1",
      [
        id,
        cedula_identidad,
        nombre,
        primer_apellido,
        segundo_apellido,
        fecha_nacimiento,
      ]
    );
  }
  async deleteUsuario(id) {
    await pool.query("DELETE FROM usuarios WHERE id = $1", [id]);
  }
  async promedio() {
    const { rows } = await pool.query(
      "SELECT AVG(EXTRACT(YEAR FROM AGE(NOW(), fecha_nacimiento))) AS promedio_edades FROM usuarios;"
    );
    return rows[0];
  }
}

//Controlador
class Controller {
  constructor(model) {
    this.model = model;
  }
  async addUsuario(req, res) {
    const cedula_identidad = req.body.cedula_identidad;
    const nombre = req.body.nombre;
    const primer_apellido = req.body.primer_apellido;
    const segundo_apellido = req.body.segundo_apellido;
    const fecha_nacimiento = req.body.fecha_nacimiento;
    await this.model.addUsuario(
      cedula_identidad,
      nombre,
      primer_apellido,
      segundo_apellido,
      fecha_nacimiento
    );
    res.sendStatus(201);
  }
  async getUsuarios(req, res) {
    const data = await this.model.getUsuarios();
    res.send(data);
  }
  async getUsuarioById(req, res) {
    const id = req.params.id_usuario;
    const data = await this.model.getUsuarioById(id);
    res.send(data);
  }
  async updateUsuario(req, res) {
    const id_usuario = req.params.id_usuario;
    console.log(req.body);
    const cedula_identidad = req.body.cedula_identidad;
    const nombre = req.body.nombre;
    const primer_apellido = req.body.primer_apellido;
    const segundo_apellido = req.body.segundo_apellido;
    const fecha_nacimiento = req.body.fecha_nacimiento;
    await this.model.updateUsuario(
      id_usuario,
      cedula_identidad,
      nombre,
      primer_apellido,
      segundo_apellido,
      fecha_nacimiento
    );
    res.sendStatus(200);
  }
  async deleteUsuario(req, res) {
    const id = req.params.id_usuario;
    await this.model.deleteUsuario(id);
    res.sendStatus(200);
  }
  async promedio(req, res) {
    const data = await this.model.promedio();
    res.send(data);
    res.sendStatus(200);
  }
  async estado_api(req, res) {
    res.send({
      name: "api-usuarios",
      version: "1.0.0",
      author: "Marin Fernandez",
      email: "mwfernandezm@gmail.com",
    });
    res.sendStatus(200);
  }
}

//Instanciacion
const model = new Model();
const controller = new Controller(model);

app.use(express.json());

app.post("/usuarios", controller.addUsuario.bind(controller));
app.get("/usuarios", controller.getUsuarios.bind(controller));
app.get("/usuarios/promedio-edad", controller.promedio.bind(controller));
app.get("/usuarios/:id_usuario", controller.getUsuarioById.bind(controller));
app.put("/usuarios/:id_usuario", controller.updateUsuario.bind(controller));
app.delete("/usuarios/:id_usuario", controller.deleteUsuario.bind(controller));
app.get("/estado", controller.estado_api.bind(controller));

app.listen(port, () => {
  console.log(`Este servidor se ejecuta en http://localhost:${port}`);
});
