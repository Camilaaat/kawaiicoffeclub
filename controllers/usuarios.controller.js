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
    let imagenAsubir = "";
    if (req.file){
        imagenAsubir = req.file.filename;
    }
    const { id } = req.params;
    const { nombre, email, contrasena } = req.body;
    console.log(id);
    console.log(nombre);
    
    const sql = "UPDATE usuarios SET nombre = ?, email = ?, contrasena = ?, url_imagen = ? WHERE id_usuario = ?";
    db.query(sql, [nombre, email, contrasena, imagenAsubir, id], (error, result) => {
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

//LOGIN
const loginUsuario = (req, res) => {
    const { email, contrasena } = req.body;

    if (!email || !contrasena) {
        return res.status(400).json({ error: "Email y contraseña son obligatorios" });
    }

    const sql = "SELECT * FROM usuarios WHERE email = ?";
    db.query(sql, [email], (error, results) => {
        if (error) {
            return res.status(500).json({ error: "Error de servidor" });
        }

        if (results.length === 0) {
            return res.status(401).json({ error: "Usuario no encontrado" });
        }

        const usuario = results[0];

        // Comparamos contraseña encriptada
        bcrypt.compare(contrasena, usuario.contrasena, (err, match) => {
            if (err) {
                return res.status(500).json({ error: "Error al verificar contraseña" });
            }

            if (!match) {
                return res.status(401).json({ error: "Contraseña incorrecta" });
            }

            // Crear token
            const token = jwt.sign(
                { id: usuario.id_usuario, email: usuario.email },
                "secretoSuperSeguro", // reemplazá por variable de entorno si querés
                { expiresIn: "2h" }
            );

            res.json({
                mensaje: "Login exitoso",
                token,
                nombre: usuario.nombre,
                email: usuario.email
            });
        });
    });
};


// EXPORTAR TODAS LAS FUNCIONES DEL MÓDULO
module.exports = {
    allUsuarios,
    showUsuario,
    storeUsuario,
    updateUsuario,
    destroyUsuario,
    loginUsuario,
};