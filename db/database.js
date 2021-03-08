
const mysql = require("mysql2");

const connection = mysql.createConnection({
    host:"localhost",
    user: "root",
    password: "cowlongsforsea2!",
    database: "employeeDB"
});


module.exports = connection;