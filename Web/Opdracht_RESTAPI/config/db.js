require('dotenv').config();
const mysql = require('mysql');

const connectionPool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DB_NAME
});

module.exports = connectionPool;