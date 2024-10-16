const express = require("express");
const app = express();

app.use(express.json());

const tareasRouter = require('./routers/tareas.router');
app.use('/tareas', tareasRouter);

const clientesRouter = require('./routers/clientes.router');
app.use('/clientes', clientesRouter);

const asuntosRouter = require('./routers/asuntos.router');
app.use('/asuntos', asuntosRouter);

app.get("/", (req, res) => {
    res.send("Hola Kawaii Coffee Club");
});


const PORT = 3000;
app.listen(PORT, ()=> console.log(`http://localhost:${PORT}`));