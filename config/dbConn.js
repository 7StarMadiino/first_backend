require('dotenv').config()

const mysql = require('mysql2/promise');


const connections = mysql.createPool({
    host: process.env.HOST_NAME,
    user: process.env.USER_NAME,
    database: process.env.DB_NAME,
    password: process.env.PASSWORD,
    dateStrings: true
});

module.exports = connections