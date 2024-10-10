const db = require("../db/db");

//// MÉTODO GET  /////

const allTasks = (req, res) => {
    const sql = "SELECT * FROM tareas";
    db.query(sql, (error, rows) => {
        if (error) {
            return res.status(500).json({ error: "ERROR: Intente más tarde por favor" });
        }
        res.json(rows);
    });
};

const showTask = (req, res) => {
    const { id } = req.params;
    const sql = "SELECT * FROM tareas WHERE id = ?";
    db.query(sql, [id], (error, rows) => {
        if (error) {
            return res.status(500).json({ error: "ERROR: Intente más tarde por favor" });
        }
        if (rows.length == 0) {
            return res.status(404).send({ error: "ERROR: No existe la tarea buscada" });
        }
        res.json(rows[0]);
    });
};

//// MÉTODO POST  /////

const storeTask = (req, res) => {
    const { tarea } = req.body;
    const sql = "INSERT INTO tareas (tarea) VALUES (?)";
    db.query(sql, [tarea], (error, result) => {
        if (error) {
            return res.status(500).json({ error: "ERROR: Intente más tarde por favor" });
        }
        const nuevaTarea = { ...req.body, id: result.insertId }; 
        res.status(201).json(nuevaTarea);
    });
};

//// MÉTODO PUT  /////

const updateTask = (req, res) => {
    const { id } = req.params;
    const { tarea } = req.body;
    const sql = "UPDATE tareas SET tarea = ? WHERE id = ?";
    db.query(sql, [tarea, id], (error, result) => {
        if (error) {
            return res.status(500).json({ error: "ERROR: Intente más tarde por favor" });
        }
        if (result.affectedRows == 0) {
            return res.status(404).send({ error: "ERROR: La tarea a modificar no existe" });
        }
        const tareaActualizada = { ...req.body, ...req.params }; 
        res.json(tareaActualizada);
    });
};

//// MÉTODO DELETE  /////

const destroyTask = (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM tareas WHERE id = ?";
    db.query(sql, [id], (error, result) => {
        if (error) {
            return res.status(500).json({ error: "ERROR: Intente más tarde por favor" });
        }
        if (result.affectedRows == 0) {
            return res.status(404).send({ error: "ERROR: La tarea a borrar no existe" });
        }
        res.json({ mensaje: "Tarea Eliminada" });
    });
};

// EXPORTAR DEL MÓDULO TODAS LAS FUNCIONES
module.exports = {
    allTasks,
    showTask,
    storeTask,
    updateTask,
    destroyTask
};
