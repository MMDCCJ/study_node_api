const mysql = require('mysql')
const db = mysql.createPool({
    host: '127.0.0.1',
    user: "root",
    password: "020522",
    database:"webdb"
})

module.exports = db