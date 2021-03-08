const db = require("../db/database");
const inquirer = require("inquirer");
const cTable = require("console.table");

const viewDepartment = () => {
    console.clear();

    const sql = `SELECT id AS ID,
                    department_name AS Department
                    FROM department`;

    db.query(sql, function (err, res) {
        if (err) throw err;

        console.table(`
LIST OF DEPARTMENTs`, res
        );

        return res;
    });
};


const addDepartment = () => {
    console.clear();

    return inquirer.prompt(
        {
            type: "input",
            name: "newDepartment",
            message: `
            
Please enter the department name: `,
            validate: (departmentName => (departmentName ? true : console.log("This field is required.")))
        }
    )
    
        .then(answer => {

            db.query(
                `INSERT INTO department (department_name)
                    VALUES (?)`,
                [answer.newDepartment],
                function (err, res) {
                    if (err) throw err;

                    console.log(`
                    
Successfully added new department: ${answer.newDepartment}
                    
                    Rows affected: ${res.affectedRows}
                    
                    `);
                    
                    return res;
                }
            );
        });
};

module.exports = { viewDepartment , addDepartment };