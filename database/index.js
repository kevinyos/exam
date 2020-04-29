const mysql = require('mysql');

const db = mysql.createConnection({
    host : 'localhost',
    user : 'Kevin',
    password : 'safron55',
    database : 'clothes',
    port : 3306
});

module.exports = db;