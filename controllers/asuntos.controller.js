const db = require("../db/db");


const allAsuntos = (req, res) => {
    const sql = "SELECT * FROM asuntos";
    db.query(sql, (error, rows) => {
        if (error) {
            return res.status(500).json({ error: "ERROR: Intente más tarde por favor" });
        }
        res.json(rows);
    });
};


const showAsunto = (req, res) => {
    const { id } = req.params;
    const sql = "SELECT * FROM asuntos WHERE id_asunto = ?";
    db.query(sql, [id], (error, rows) => {
        if (error) {
            return res.status(500).json({ error: "ERROR: Intente más tarde por favor" });
        }
        if (rows.length == 0) {
            return res.status(404).send({ error: "ERROR: No existe el asunto buscado" });
        }
        res.json(rows[0]);
    });
};


const storeAsunto = (req, res) => {
    const { descripcion_asunto } = req.body;
    const sql = "INSERT INTO asuntos (descripcion_asunto) VALUES (?)";
    db.query(sql, [descripcion_asunto], (error, result) => {
        if (error) {
            return res.status(500).json({ error: "ERROR: Intente más tarde por favor" });
        }
        const nuevoAsunto = { ...req.body, id: result.insertId };
        res.status(201).json(nuevoAsunto);
    });
};


const updateAsunto = (req, res) => {
    const { id } = req.params;
    const { descripcion_asunto } = req.body;
    const sql = "UPDATE asuntos SET descripcion_asunto = ? WHERE id_asunto = ?";
    db.query(sql, [descripcion_asunto, id], (error, result) => {
        if (error) {
            return res.status(500).json({ error: "ERROR: Intente más tarde por favor" });
        }
        if (result.affectedRows == 0) {
            return res.status(404).send({ error: "ERROR: El asunto a modificar no existe" });
        }
        const asuntoActualizado = { ...req.body, ...req.params };
        res.json(asuntoActualizado);
    });
};


const destroyAsunto = (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM asuntos WHERE id_asunto = ?";
    db.query(sql, [id], (error, result) => {
        if (error) {
            return res.status(500).json({ error: "ERROR: Intente más tarde por favor" });
        }
        if (result.affectedRows == 0) {
            return res.status(404).send({ error: "ERROR: El asunto a borrar no existe" });
        }
        res.json({ mensaje: "Asunto eliminado" });
    });
};


module.exports = {
    allAsuntos,
    showAsunto,
    storeAsunto,
    updateAsunto,
    destroyAsunto
};
