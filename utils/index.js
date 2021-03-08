const db = require("../db/database");
const inquirer = require("inquirer");
const { viewDepartment, addDepartment } = require("./department");
const { viewRoles, addRole } = require("./roles");
const { viewEmployees, addEmployee, updateEmployee } = require("./employees");


const startPrompt = () => {
    console.clear();
    console.log(`
    
    Welcome to the employee tracker
    
    `);    

    return inquirer.prompt({
        type: "list",
        name: "menu",
        message: "What would you like to do?",
        choices: [
            "View Departments",
            "View Roles",
            "View Employees",
            "Add Department",
            "Add Role",
            "Add Employee",
            "Update Employee",
            "Exit"
        ]
    })


    .then((options) => {
        switch (options.menu) {
            case "View Departments": {
                viewDepartment();
                break;
            }
            case "View Roles": {
                viewRoles();
                break;
            }
            case "View Employees": {
                viewEmployees();
                break;
            }
            case "Add Department": {
                addDepartment();
                break;
            }
            case "Add Role": {
                addRole();
                break;
            }
            case "Add Employee": {
                addEmployee();
                break;
            }
            case "Update Employee": {
                updateEmployee();
                break;
            }
            case "Exit": {
                console.log("Goodbye.");
                db.end();
                break;
            }
        }
    })

    .then(startPrompt)
    .catch(err => {
        console.log(err)
        throw err;
    })

};

module.exports = startPrompt;