const mysql = require('mysql2/promise');


const connections = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'api_first',
    password: '',
    dateStrings: true
});

module.exports = connections