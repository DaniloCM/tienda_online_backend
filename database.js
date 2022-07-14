const mysql = require("mysql2");

require("dotenv").config();

// Creacion de la connection pooling, con las credenciales de la base de datos
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_PASSWORD,
    password: process.env.DB_DATABASE
});

// Comprueba la conexión a la base de datos
pool.getConnection((error, connection) => {
    // Si no esta conectada a la base de datos informa el error
    if (error) console.log(error, "database");

    // Si esta conectada, termina la conexión
    if (connection) connection.release();

    // informa que la base de datos esta conectada
    console.log("DB is connected");

    return;
});

module.exports = pool;