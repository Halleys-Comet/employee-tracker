const db = require("../db/database");
const inquirer = require("inquirer");
const cTable = require("console.table");

const viewEmployees = () => {
    console.clear();


    const sql = `SELECT id AS ID,
                    last_name AS Last,
                    first_name AS First,
                    title AS Title,
                    manager_name AS Supervisor
                    FROM employees`;


    db.query(sql, function (err, res) {
        if (err) throw err;

        console.table(`
LIST OF EMPLOYEES`, res
        );

        return res;
    });
};


const addEmployee = () => {


    return inquirer.prompt([
        {
            type: "input",
            name: "lastName",
            message: `
            
Please enter the employee's last name: `,
            validate: (lastName => (lastName ? true : console.log("This field is required.")))
        },
        {
            type: "input",
            name: "firstName",
            message: `
            
Please enter the employee's first name: `,
            validate: (firstName => (firstName ? true : console.log("This field is required.")))
        },
        {
            type: "input",
            name: "role",
            message: `
            
Please enter this employee's role: `,
            validate: (title => (title ? true : console.log("This field is required.")))

        },
        {
            type: "list",
            name: "manager",
            message: `
                
Who is this employee's direct supervisor?`,
            choices: [
                "Jimbo",
                "Samantha",
            ]
        }
    ])


        .then(answers => {
            db.query(
                `INSERT INTO employees (last_name, first_name, title, manager_name)
                        VALUES (?, ?, ?, ?)`,
                [answers.lastName, answers.firstName, answers.role, answers.manager],
                function (err, res) {
                    if (err) throw err;

                    console.log(`
                        
Successfully added new employee: ${answers.firstName} ${answers.lastName}
                    Rows affected: ${res.affectedRows}
                    `);

                    return res;
                }
            );
        });
};

const updateEmployee = () => {
    console.clear();

    db.query(
        `SELECT last_name, first_name, title, id FROM employees`,
        function (err, results) {
            if (err) throw err;

            const employees = results.map(data => {
                let employee = `${data.last_name}, ${data.first_name}, ${data.title}, ${data.id}`;

                return employee;
            });

            return inquirer.prompt([
                {
                    type: "list",
                    name: "whichEmployee",
                    message: `
                
Which employee would you like to update?`,
                    choices: employees
                },
                {
                    type: "input",
                    name: "newTitle",
                    message: `
                    
Please enter the employee's new role: `,
                    validate: (newRole => (newRole ? true : console.log("This field is required.")))
                }
            ])

            
            .then(employee => {
                const employeeData = employee.whichEmployee.split(", ");
                const employeeName = employeeData[1] + employeeData[0];
                const employeeID = parseInt(employeeData[3]);

                const oldRole = employeeData[2];
                const newRole = employee.newTitle;

                db.query(
                    `UPDATE employees SET title = ? WHERE id = ?`,
                    [employee.newTitle, employeeID],
                    function (err, res) {
                        if (err) throw err;

                        console.log(`
                        
Successfully updated ${employeeName} from ${oldRole} to ${newRole}!
                        Rows affected: ${res.affectedRows}
                        `)

                        return res;
                    }
                );
            });
        }
    );
};

module.exports = { viewEmployees, addEmployee, updateEmployee };