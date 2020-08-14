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

// Runs the App and prompts the user with choices to choose from
function startApp() {
    inquirer.prompt({
        name: "mainmenu",
        type: "list",
        message: "What would you like to do?",
        choices: [
            "Show All Employees",
            "Add Employee Info",
            "Remove Employee",
            "Show Roles",
            "Add Role",
            "Remove Role",
            "Show Departments",
            "Add Department",
            "Remove Department",
            "Exit"
        ]
    }).then(responses => {
        console.log("You selected: ", responses.mainmenu);

        switch (responses.mainmenu) {
            case "Show All Employees":
                showEmployees();
                break;
            case "Add Employee Info":
                addEmployee();
                break;
            case "Remove Employee":
                removeEmployee();
                break;
            case "Show Roles":
                showRoles();
                break;
            case "Add Role":
                addRole();
                break;
            // case "Remove Role":
            //     Role();
            //     break;
            case "Show Departments":
                showDepartments();
                break;
            case "Add Department":
                addDepartment();
                break;
            // case "Remove Department":
            //     removeDepartment();
            //     break;
            case "Exit":
                connection.end();
                break;
        }
    });
}

// This displays all employees in the terminal
function showEmployees() {

    // select from the database
    let query = "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department on role.department_id = department.id;";
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        startApp();
    });
}

// Prompts user to add a new employee
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

// Deletes employee from the database
function removeEmployee() {
    inquirer.prompt({

        type: "input",
        message: "Enter ID of employee to termanate?",
        name: "id"

    }).then(answer => {
        connection.query("DELETE FROM employee WHERE id = (?)", [answer.id], function (err, res) {
            if (err) throw err;
            console.table(res)
            startApp()
        })
    })
}

// This displays all roles in the terminal
function showRoles() {

    // select from the database
    let query = "SELECT * FROM role";
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        startApp();
    });
}

// Prompts user to add a new role
function addRole() {
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

// This displays all departments in the terminal
function showDepartments() {

    // select from the database
    let query = "SELECT * FROM department";
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        startApp();
    });
}

// Prompts user to add a new department
function addDepartment() {
    inquirer.prompt({

        type: "input",
        message: "What is the name of the department?",
        name: "deptName"

    }).then(answer => {
        connection.query("INSERT INTO department (name) VALUES (?)", [answer.deptName], function (err, res) {
            if (err) throw err;
            console.table(res)
            startApp()
        })
    })
}