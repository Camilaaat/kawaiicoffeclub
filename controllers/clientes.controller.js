const db = require("../db/db");


const allClientes = (req, res) => {
    const sql = "SELECT * FROM clientes";
    db.query(sql, (error, rows) => {
        if (error) {
            return res.status(500).json({ error: "ERROR: Intente más tarde por favor" });
        }
        res.json(rows);
    });
};


const showCliente = (req, res) => {
    const { id } = req.params;
    const sql = "SELECT * FROM clientes WHERE id_cliente = ?";
    db.query(sql, [id], (error, rows) => {
        if (error) {
            return res.status(500).json({ error: "ERROR: Intente más tarde por favor" });
        }
        if (rows.length == 0) {
            return res.status(404).send({ error: "ERROR: No existe el cliente buscado" });
        }
        res.json(rows[0]);
    });
};


const storeCliente = (req, res) => {
    const { nombre_completo, correo_electronico, telefono } = req.body;
    const sql = "INSERT INTO clientes (nombre_completo, correo_electronico, telefono) VALUES (?, ?, ?)";
    db.query(sql, [nombre_completo, correo_electronico, telefono], (error, result) => {
        if (error) {
            return res.status(500).json({ error: "ERROR: Intente más tarde por favor" });
        }
        const nuevoCliente = { ...req.body, id: result.insertId };
        res.status(201).json(nuevoCliente);
    });
};


const updateCliente = (req, res) => {
    const { id } = req.params;
    const { nombre_completo, correo_electronico, telefono } = req.body;
    const sql = "UPDATE clientes SET nombre_completo = ?, correo_electronico = ?, telefono = ? WHERE id_cliente = ?";
    db.query(sql, [nombre_completo, correo_electronico, telefono, id], (error, result) => {
        if (error) {
            return res.status(500).json({ error: "ERROR: Intente más tarde por favor" });
        }
        if (result.affectedRows == 0) {
            return res.status(404).send({ error: "ERROR: El cliente a modificar no existe" });
        }
        const clienteActualizado = { ...req.body, ...req.params };
        res.json(clienteActualizado);
    });
};


const destroyCliente = (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM clientes WHERE id_cliente = ?";
    db.query(sql, [id], (error, result) => {
        if (error) {
            return res.status(500).json({ error: "ERROR: Intente más tarde por favor" });
        }
        if (result.affectedRows == 0) {
            return res.status(404).send({ error: "ERROR: El cliente a borrar no existe" });
        }
        res.json({ mensaje: "Cliente eliminado" });
    });
};


module.exports = {
    allClientes,
    showCliente,
    storeCliente,
    updateCliente,
    destroyCliente
};
