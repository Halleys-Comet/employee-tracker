const mysql = require('mysql2');
const connection = require("./db/database");
const db = require('./db/database');
const cTable = require("console.table");
const startPrompt = require("./utils/index")

db.connect(err => {
    if (err) {
        console.log(`Error: ${err.message}`);
        return;
    }

    startPrompt()
        .catch(err => console.log(err));
});










