const mysql = require("mysql2");


const connection = mysql.createConnection({
    host: "localhost",
    user: "root", 
    password: "", 
    database: "kawaii_coffee_db"
});


connection.connect((error) => {
    if (error) {
        return console.error("Error al conectar a la base de datos:", error);
    }
    console.log("Conectado a la base de datos 'kawaii_coffee_db' exitosamente");
});

module.exports = connection;
