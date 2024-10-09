const mysql = require("mysql2");


const connection = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "",
    database : "tareas"
});

connection.connect((error) => {
    if(error){
        return console.error(error);
    }
    console.log("Estamos conectados a la Base de Datos - tareas");
});


module.exports = connection;
