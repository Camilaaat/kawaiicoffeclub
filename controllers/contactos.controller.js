const db = require("../db/db"); 

//// MÉTODO GET  /////


const allContactos = (req, res) => {
    const sql = "SELECT * FROM contactos";
    db.query(sql, (error, rows) => {
        if (error) {
            return res.status(500).json({ error: "ERROR: Intente más tarde por favor" });
        }
        res.json(rows);
    });
};


const showContacto = (req, res) => {
    const { id } = req.params;
    const sql = "SELECT * FROM contactos WHERE id = ?";
    db.query(sql, [id], (error, rows) => {
        if (error) {
            return res.status(500).json({ error: "ERROR: Intente más tarde por favor" });
        }
        if (rows.length === 0) {
            return res.status(404).send({ error: "ERROR: No existe el contacto buscado" });
        }
        res.json(rows[0]);
    });
};

//// MÉTODO POST  /////


const storeContacto = (req, res) => {
    const { nombre, email, telefono, asunto, mensaje, preferencia_contacto, acepto_promociones } = req.body;
    const sql = "INSERT INTO contactos (nombre, email, telefono, asunto, mensaje, preferencia_contacto, acepto_promociones) VALUES (?, ?, ?, ?, ?, ?, ?)";
    db.query(sql, [nombre, email, telefono, asunto, mensaje, preferencia_contacto, acepto_promociones], (error, result) => {
        if (error) {
            return res.status(500).json({ error: "ERROR: Intente más tarde por favor" });
        }
        const nuevoContacto = { id: result.insertId, ...req.body }; 
        res.status(201).json(nuevoContacto);
    });
};

//// MÉTODO PUT  /////


const updateContacto = (req, res) => {
    const { id } = req.params;
    const { nombre, email, telefono, asunto, mensaje, preferencia_contacto, acepto_promociones } = req.body;
    const sql = "UPDATE contactos SET nombre = ?, email = ?, telefono = ?, asunto = ?, mensaje = ?, preferencia_contacto = ?, acepto_promociones = ? WHERE id = ?";
    db.query(sql, [nombre, email, telefono, asunto, mensaje, preferencia_contacto, acepto_promociones, id], (error, result) => {
        if (error) {
            return res.status(500).json({ error: "ERROR: Intente más tarde por favor" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).send({ error: "ERROR: El contacto a modificar no existe" });
        }
        const contactoActualizado = { id, ...req.body }; 
        res.json(contactoActualizado);
    });
};

//// MÉTODO DELETE  /////


const destroyContacto = (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM contactos WHERE id = ?";
    db.query(sql, [id], (error, result) => {
        if (error) {
            return res.status(500).json({ error: "ERROR: Intente más tarde por favor" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).send({ error: "ERROR: El contacto a borrar no existe" });
        }
        res.json({ mensaje: "Contacto Eliminado" });
    });
};

// EXPORTAR DEL MÓDULO TODAS LAS FUNCIONES
module.exports = {
    allContactos,
    showContacto,
    storeContacto,
    updateContacto,
    destroyContacto
};
