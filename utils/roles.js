// Dependencies
const db = require("../db/database");
const inquirer = require("inquirer");
const cTable = require("console.table");



const viewRoles = () => {
    console.clear();

    const sql = `SELECT id AS ID,
                    title AS Title,
                    department_name AS Department,
                    salary AS Salary
                    FROM roles`;

    db.query(sql, function (err, res) {
        if (err) throw err;

        console.table(`
COMPANY ROLES`, res
        );

        return res;
    });
};


const addRole = () => {
    console.clear();

    return inquirer.prompt([
        {
            type: "input",
            name: "title",
            message: `
            
Please enter the title of this role: `,
            validate: (roleTitle => (roleTitle ? true : console.log("This field is required.")))
        },
        {
            type: "input",
            name: "salary",
            message: `
            
Please enter the salary for this role: `,
            validate: (salaryInput => (salaryInput ? true : console.log("This field is required.")))
        },
        {
            type: "list",
            name: "department",
            message: `
                
What department is this role in?`,
            choices: [
                "Sales",
                "Finance",
                "Engineering",
                "Legal",
            ]
        }
    ])
        .then((answers) => {
            db.query(
                `INSERT INTO roles (title, salary, department_name)
                    VALUES (?, ?, ?)`,
                [answers.title, answers.salary, answers.department],
                function (err, res) {
                    if (err) throw err;

                    console.log(`
                        
Successfully added new role: ${answers.title}
                    Rows affected: ${res.affectedRows}
                    `);

                    return res;
                }
            );
        });
};


module.exports = { viewRoles, addRole };