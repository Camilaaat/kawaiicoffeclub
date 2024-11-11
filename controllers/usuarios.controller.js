const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const db = require("../db/db");

//// MÉTODO GET  /////

const allUsuarios = (req, res) => {
    const sql = "SELECT * FROM usuarios";
    db.query(sql, (error, rows) => {
        if (error) {
            return res.status(500).json({ error: "ERROR: Intente más tarde por favor" });
        }
        res.json(rows);
    });
};

const showUsuario = (req, res) => {
    const { id } = req.params;
    const sql = "SELECT * FROM usuarios WHERE id_usuario = ?";
    db.query(sql, [id], (error, rows) => {
        if (error) {
            return res.status(500).json({ error: "ERROR: Intente más tarde por favor" });
        }
        if (rows.length == 0) {
            return res.status(404).send({ error: "ERROR: No existe el usuario buscado" });
        }
        res.json(rows[0]);
    });
};

//// MÉTODO POST  /////


const storeUsuario = (req, res) => {
    console.log('Body:', req.body); 
    console.log('File:', req.file); 

    let imagenAsubir = "";
    if (req.file){
        imagenAsubir = req.file.filename;
    }
    const { nombre, email, contrasena } = req.body;
    if(!nombre || !email || !contrasena) {
        return res.status(400).send("Los campos son obligatorios");
    }

    bcrypt.hash(contrasena,5,(err,hashedPassword)=>{
        if (err){
            return res.status(500).send("Error de incriptacion")
        }


        const sql = "INSERT INTO usuarios (nombre, email, contrasena, url_imagen) VALUES (?, ?, ?, ?)";
        db.query(sql, [nombre, email, hashedPassword, imagenAsubir], (error, result) => {
            if (error) {
                return res.status(500).json({ error: "ERROR: Intente más tarde por favor" });
            }
            const nuevoUsuario = { id_usuario: result.insertId, ...req.body }; 
            res.status(201).json(nuevoUsuario);
        });
    })
};

//// MÉTODO PUT  /////

const updateUsuario = (req, res) => {
    const { id } = req.params;
    const { nombre, email, contrasena } = req.body;
    const sql = "UPDATE usuarios SET nombre = ?, email = ?, contrasena = ? WHERE id_usuario = ?";
    db.query(sql, [nombre, email, contrasena, id], (error, result) => {
        if (error) {
            return res.status(500).json({ error: "ERROR: Intente más tarde por favor" });
        }
        if (result.affectedRows == 0) {
            return res.status(404).send({ error: "ERROR: El usuario a modificar no existe" });
        }
        const usuarioActualizado = { id_usuario: id, ...req.body }; 
        res.json(usuarioActualizado);
    });
};

//// MÉTODO DELETE  /////

const destroyUsuario = (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM usuarios WHERE id_usuario = ?";
    db.query(sql, [id], (error, result) => {
        if (error) {
            return res.status(500).json({ error: "ERROR: Intente más tarde por favor" });
        }
        if (result.affectedRows == 0) {
            return res.status(404).send({ error: "ERROR: El usuario a borrar no existe" });
        }
        res.json({ mensaje: "Usuario Eliminado" });
    });
};

// EXPORTAR TODAS LAS FUNCIONES DEL MÓDULO
module.exports = {
    allUsuarios,
    showUsuario,
    storeUsuario,
    updateUsuario,
    destroyUsuario
};