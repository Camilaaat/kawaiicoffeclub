require("dotenv").config();

const express = require("express");
const app = express();

app.use(express.json());

//RUTAS TABLAS
const tareasRouter = require('./routers/tareas.router');
app.use('/tareas', tareasRouter);

const suscriptoresRouter = require('./routers/suscriptores.router');
app.use('/suscriptores', suscriptoresRouter);

const interesesRouter = require('./routers/intereses.router');
app.use('/intereses', interesesRouter);

const fotosClientesRouter = require('./routers/fotosclientes.router');
app.use('/fotosclientes', fotosClientesRouter);

const contactosRouter = require('./routers/contactos.router');
app.use('/contactos', contactosRouter);

const usuariosRouter = require('./routers/usuarios.router');
app.use('/usuarios', usuariosRouter);

const authRouter = require('./routers/auth.router');
app.use('/auth', authRouter);

//RUTAS LOGIN,REGISTER,ADMIN
app.get("/", (req, res) => res.sendFile(__dirname + "/login.html"));

app.get("/", (req, res) => {
    res.send("Hola Kawaii Coffee Club");
});



const PORT = 3000;
app.listen(PORT, ()=> console.log(`http://localhost:${PORT}`));