const express = require("express");
const app = express();

app.use(express.json());

const tareasRouter = require('./routers/tareas.router');
app.use('/tareas', tareasRouter);

const clientesRouter = require('./routers/clientes.router');
app.use('/clientes', clientesRouter);

const asuntosRouter = require('./routers/asuntos.router');
app.use('/asuntos', asuntosRouter);

const usuariosRouter = require('./routers/usuarios.router');
app.use('/usuarios', usuariosRouter);


app.get("/", (req, res) => {
    res.send("Hola Kawaii Coffee Club");
});


const PORT = 3000;
app.listen(PORT, ()=> console.log(`http://localhost:${PORT}`));