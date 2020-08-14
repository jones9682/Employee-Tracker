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
            "Show All Employees",
            "Add Employee Info",
            "Show Roles",
            "Edit Role",
            "Show Departments",
            "Edit Department",
            "Exit"
        ]
    }).then(responses => {
        switch (responses.mainmenu) {
            case "Show All Employees":
                showEmployees();
                break;
            case "Add Employee Info":
                addEmployee();
                break;
            case "Show Roles":
                showRoles();
                break;
            case "Edit Role":
                editRole();
                break;
            case "Show Departments":
                showDepartments();
                break;
            case "Edit Department":
                editDepartment();
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
        .then(answer => {


            connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [answer.firstName, answer.lastName, answer.roleId, answer.managerId], function (err, res) {
                if (err) throw err;
                console.table(res);
                startApp();
            });
        });
}

function showRoles() {
    // select from the db
    let query = "SELECT * FROM role";
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        startApp();
    });
}

function editRole() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "What's the name of the role?",
                name: "roleName"
            },
            {
                type: "input",
                message: "What is the salary for this role?",
                name: "salaryTotal"
            },
            {
                type: "input",
                message: "What is the department id number?",
                name: "deptId"
            }
        ])
        .then(answer => {


            connection.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", [answer.roleName, answer.salaryTotal, answer.deptId], function (err, res) {
                if (err) throw err;
                console.table(res);
                startApp();
            });
        });
}