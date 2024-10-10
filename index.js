const express = require("express");
const app = express();

app.use(express.json());

const tareasRouter = require('./routers/tareas.router');
app.use('/tareas', tareasRouter);


app.get("/", (req, res) => {
    res.send("Hola Kawaii Coffee Club");
});


const PORT = 3000;
app.listen(PORT, ()=> console.log(`http://localhost:${PORT}`));