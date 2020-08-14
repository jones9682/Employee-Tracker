var inquirer = require('inquirer')
var mysql = require('mysql')
var cTable = require("console.table")

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'Bobby Jones',
    password: 'Pa$$word',
    database: 'employee_tracker_db'
})

connection.connect(function (err) {
    if (err) throw err
    startApp()
})

function startApp() {
    inquirer.prompt({
        name: "mainmenu",
        type: "list",
        message: "What would you like to do?",
        choices: [
            "View All Employees",
            "Add Employee Info",
            "View Roles",
            "Edit Roles",
            "View Departments",
            "Edit Departments",
            "Exit"
        ]
    }).then(responses => {
        switch (responses.mainmenu) {
            case "View All Employees":
                showEmployees();
                break;
            case "Add Employee Info":
                addEmployee();
                break;
            case "View Roles":
                showRole();
                break;
            case "Edit Roles":
                editRoles();
                break;
            case "View Departments":
                showDepartments();
                break;
            case "Edit Departments":
                editDepartments();
                break;
            case "Exit":
                connection.end();
                break;
        }
    });
}

function showEmployees() {
    // select from the db
    let query = "SELECT * FROM employee";
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        startApp();
    });
}

function addEmployee() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "What's the first name of the employee?",
                name: "firstName"
            },
            {
                type: "input",
                message: "What's the last name of the employee?",
                name: "lastName"
            },
            {
                type: "input",
                message: "What is the employee's role id number?",
                name: "roleId"
            },
            {
                type: "input",
                message: "What is the manager id number?",
                name: "managerId"
            }
        ])
        .then(function (answer) {


            connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [answer.firstName, answer.lastName, answer.roleId, answer.managerId], function (err, res) {
                if (err) throw err;
                console.table(res);
                startApp();
            });
        });
}