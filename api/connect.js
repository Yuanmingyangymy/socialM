const mysql = require('mysql');


const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "admin123",
    database: "social"
})

module.exports = db