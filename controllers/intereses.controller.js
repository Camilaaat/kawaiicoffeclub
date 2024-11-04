const db = require("../db/db"); // Asegúrate de que la ruta sea correcta

//// MÉTODO GET  /////

const allIntereses = (req, res) => {
    const sql = "SELECT * FROM intereses";
    db.query(sql, (error, rows) => {
        if (error) {
            return res.status(500).json({ error: "ERROR: Intente más tarde por favor" });
        }
        res.json(rows);
    });
};


const showInteres = (req, res) => {
    const { id } = req.params;
    const sql = "SELECT * FROM intereses WHERE id = ?";
    db.query(sql, [id], (error, rows) => {
        if (error) {
            return res.status(500).json({ error: "ERROR: Intente más tarde por favor" });
        }
        if (rows.length === 0) {
            return res.status(404).send({ error: "ERROR: No existe el interés buscado" });
        }
        res.json(rows[0]);
    });
};

//// MÉTODO POST  /////


const storeInteres = (req, res) => {
    const { suscriptor_id, interes } = req.body;
    const sql = "INSERT INTO intereses (suscriptor_id, interes) VALUES (?, ?)";
    db.query(sql, [suscriptor_id, interes], (error, result) => {
        if (error) {
            return res.status(500).json({ error: "ERROR: Intente más tarde por favor" });
        }
        const nuevoInteres = { id: result.insertId, suscriptor_id, interes }; 
        res.status(201).json(nuevoInteres);
    });
};

//// MÉTODO PUT  /////


const updateInteres = (req, res) => {
    const { id } = req.params;
    const { suscriptor_id, interes } = req.body;
    const sql = "UPDATE intereses SET suscriptor_id = ?, interes = ? WHERE id = ?";
    db.query(sql, [suscriptor_id, interes, id], (error, result) => {
        if (error) {
            return res.status(500).json({ error: "ERROR: Intente más tarde por favor" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).send({ error: "ERROR: El interés a modificar no existe" });
        }
        const interesActualizado = { id, suscriptor_id, interes }; 
        res.json(interesActualizado);
    });
};

//// MÉTODO DELETE  /////

const destroyInteres = (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM intereses WHERE id = ?";
    db.query(sql, [id], (error, result) => {
        if (error) {
            return res.status(500).json({ error: "ERROR: Intente más tarde por favor" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).send({ error: "ERROR: El interés a borrar no existe" });
        }
        res.json({ mensaje: "Interés Eliminado" });
    });
};

// EXPORTAR DEL MÓDULO TODAS LAS FUNCIONES
module.exports = {
    allIntereses,
    showInteres,
    storeInteres,
    updateInteres,
    destroyInteres
};
