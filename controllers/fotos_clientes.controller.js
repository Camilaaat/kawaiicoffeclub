const db = require("../db/db");

//// MÉTODO GET  /////

const allFotosClientes = (req, res) => {
    const sql = "SELECT * FROM fotos_clientes";
    db.query(sql, (error, rows) => {
        if (error) {
            return res.status(500).json({ error: "ERROR: Intente más tarde por favor" });
        }
        res.json(rows);
    });
};

const showFotoCliente = (req, res) => {
    const { id } = req.params;
    const sql = "SELECT * FROM fotos_clientes WHERE id = ?";
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
    const { nombre, ruta_imagen } = req.body; // Asegúrate de que estos datos se envían correctamente
    const sql = "INSERT INTO fotos_clientes (nombre, ruta_imagen) VALUES (?, ?)";
    db.query(sql, [nombre, ruta_imagen], (error, result) => {
        if (error) {
            return res.status(500).json({ error: "ERROR: Intente más tarde por favor" });
        }
        const nuevaFotoCliente = { id: result.insertId, nombre, ruta_imagen }; 
        res.status(201).json(nuevaFotoCliente);
    });
};

//// MÉTODO PUT  /////

const updateFotoCliente = (req, res) => {
    const { id } = req.params;
    const { nombre, ruta_imagen } = req.body; // Asegúrate de que estos datos se envían correctamente
    const sql = "UPDATE fotos_clientes SET nombre = ?, ruta_imagen = ? WHERE id = ?";
    db.query(sql, [nombre, ruta_imagen, id], (error, result) => {
        if (error) {
            return res.status(500).json({ error: "ERROR: Intente más tarde por favor" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).send({ error: "ERROR: La foto a modificar no existe" });
        }
        const fotoClienteActualizada = { id, nombre, ruta_imagen }; 
        res.json(fotoClienteActualizada);
    });
};

//// MÉTODO DELETE  /////

const destroyFotoCliente = (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM fotos_clientes WHERE id = ?";
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
