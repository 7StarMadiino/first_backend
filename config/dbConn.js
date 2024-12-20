require('dotenv').config()

const mysql = require('mysql2/promise');


const connections = mysql.createPool({
    host: PROCESS.env.HOST_NAME,
    user: PROCESS.env.USER_NAME,
    database: PROCESS.env.DB_NAME,
    password: PROCESS.env.PASSWORD,
    dateStrings: true
});

module.exports = connections