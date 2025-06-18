const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const db = require("../db/db");

//// MÉTODO GET  /////

const allFotosClientes = (req, res) => {
    const sql = "SELECT * FROM fotosclientes";
    db.query(sql, (error, rows) => {
        if (error) {
            return res.status(500).json({ error: "ERROR: Intente más tarde por favor" });
        }
        res.json(rows);
    });
};

const showFotoCliente = (req, res) => {
    const { id } = req.params;
    const sql = "SELECT * FROM fotosclientes WHERE id = ?";
    db.query(sql, [id], (error, rows) => {
        if (error) {
            return res.status(500).json({ error: "ERROR: Intente más tarde por favor" });
        }
        if (rows.length === 0) {
            return res.status(404).send({ error: "ERROR: No existe la foto buscada" });
        }
        res.json(rows[0]);
    });
};

//// MÉTODO POST  /////

const storeFotoCliente = (req, res) => {
    console.log('Body:', req.body); 
    console.log('File:', req.file); 

    let imagenAsubir = "";
    if (req.file) {
        // Genera la ruta completa con el nombre del archivo
        imagenAsubir = "/img_clientes/" + req.file.filename; // o la ruta que estés usando para guardar las imágenes
    }

    const { nombre } = req.body; 
    const sql = "INSERT INTO fotosclientes (nombre, ruta_imagen) VALUES (?, ?)";
    db.query(sql, [nombre, imagenAsubir], (error, result) => {
        if (error) {
            return res.status(500).json({ error: "ERROR: Intente más tarde por favor" });
        }
        const nuevaFotoCliente = { id: result.insertId, nombre, ruta_imagen: imagenAsubir }; 
        res.status(201).json(nuevaFotoCliente);
    });
};


//// MÉTODO PUT  /////

const updateFotoCliente = (req, res) => {
    const { id } = req.params;
    const { nombre } = req.body;

    let ruta_imagen = req.body.ruta_imagen; // puede venir vacía o nula

    if (req.file) {
        ruta_imagen = "/img_clientes/" + req.file.filename;
    }

    const sql = "UPDATE fotosclientes SET nombre = ?, ruta_imagen = ? WHERE id = ?";
    db.query(sql, [nombre, ruta_imagen, id], (error, result) => {
        if (error) {
            return res.status(500).json({ error: "ERROR: Intente más tarde por favor" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).send({ error: "ERROR: La foto a modificar no existe" });
        }
        res.json({ id, nombre, ruta_imagen });
    });
};


//// MÉTODO DELETE  /////

const destroyFotoCliente = (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM fotosclientes WHERE id = ?";
    db.query(sql, [id], (error, result) => {
        if (error) {
            return res.status(500).json({ error: "ERROR: Intente más tarde por favor" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).send({ error: "ERROR: La foto a borrar no existe" });
        }
        res.json({ mensaje: "Foto de Cliente Eliminada" });
    });
};

// EXPORTAR DEL MÓDULO TODAS LAS FUNCIONES
module.exports = {
    allFotosClientes,
    showFotoCliente,
    storeFotoCliente,
    updateFotoCliente,
    destroyFotoCliente
};
