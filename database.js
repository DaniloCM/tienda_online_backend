const mysql = require("mysql2");

require("dotenv").config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_PASSWORD,
    password: process.env.DB_DATABASE
});

pool.getConnection((error, connection) => {
    if (error) console.log(error, "database");

    if (connection) connection.release();

    console.log("DB is connected");

    return;
});

module.exports = pool;