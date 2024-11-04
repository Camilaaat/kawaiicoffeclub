const db = require("../db/db");

//// MÉTODO GET  /////


const allSuscriptores = (req, res) => {
    const sql = "SELECT * FROM suscriptores";
    db.query(sql, (error, rows) => {
        if (error) {
            return res.status(500).json({ error: "ERROR: Intente más tarde por favor" });
        }
        res.json(rows);
    });
};


const showSuscriptor = (req, res) => {
    const { id } = req.params;
    const sql = "SELECT * FROM suscriptores WHERE id = ?";
    db.query(sql, [id], (error, rows) => {
        if (error) {
            return res.status(500).json({ error: "ERROR: Intente más tarde por favor" });
        }
        if (rows.length === 0) {
            return res.status(404).send({ error: "ERROR: No existe el suscriptor buscado" });
        }
        res.json(rows[0]);
    });
};

//// MÉTODO POST  /////


const storeSuscriptor = (req, res) => {
    const { nombre, email, fecha_nacimiento, acepto_promociones, acepto_terminos } = req.body;
    const sql = "INSERT INTO suscriptores (nombre, email, fecha_nacimiento, acepto_promociones, acepto_terminos) VALUES (?, ?, ?, ?, ?)";
    db.query(sql, [nombre, email, fecha_nacimiento, acepto_promociones, acepto_terminos], (error, result) => {
        if (error) {
            return res.status(500).json({ error: "ERROR: Intente más tarde por favor" });
        }
        const nuevoSuscriptor = { id: result.insertId, ...req.body }; 
        res.status(201).json(nuevoSuscriptor);
    });
};

//// MÉTODO PUT  /////

const updateSuscriptor = (req, res) => {
    const { id } = req.params;
    const { nombre, email, fecha_nacimiento, acepto_promociones, acepto_terminos } = req.body;
    const sql = "UPDATE suscriptores SET nombre = ?, email = ?, fecha_nacimiento = ?, acepto_promociones = ?, acepto_terminos = ? WHERE id = ?";
    db.query(sql, [nombre, email, fecha_nacimiento, acepto_promociones, acepto_terminos, id], (error, result) => {
        if (error) {
            return res.status(500).json({ error: "ERROR: Intente más tarde por favor" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).send({ error: "ERROR: El suscriptor a modificar no existe" });
        }
        const suscriptorActualizado = { id, ...req.body }; 
        res.json(suscriptorActualizado);
    });
};

//// MÉTODO DELETE  /////


const destroySuscriptor = (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM suscriptores WHERE id = ?";
    db.query(sql, [id], (error, result) => {
        if (error) {
            return res.status(500).json({ error: "ERROR: Intente más tarde por favor" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).send({ error: "ERROR: El suscriptor a borrar no existe" });
        }
        res.json({ mensaje: "Suscriptor Eliminado" });
    });
};

// EXPORTAR DEL MÓDULO TODAS LAS FUNCIONES
module.exports = {
    allSuscriptores,
    showSuscriptor,
    storeSuscriptor,
    updateSuscriptor,
    destroySuscriptor
};
