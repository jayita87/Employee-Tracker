// Require dependencies
const mysql = require('mysql2');
const inquirer = require('inquirer');
const consoleTable = require('console.table');

// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username and password
        user: 'root',
        password: 'rootroot',
        database: 'employee_db'
    },
    console.log(`\n\nWelcome to the Employee Tracker\n\n===============================\n`)
);

db.connect(err => {
    if (err) throw err;
    // init();
})

function init() {
    inquirer.prompt([
        {
            type: "list",
            message: "What would you like to do?",
            name: "choice",
            choices: [
                "View All Employees:",
                "View All Roles:",
                "View all Deparments:",
                "Update Employee Role:",
                "Add Employee?",
                "Add Role?",
                "Add Department?",
                "Quit"
            ]
        }
    ]).then(function (answer) {
        switch (answer.choice) {
            case "View All Employees:":
                viewAllEmployees();
                break;

            case "View All Roles:":
                viewAllRoles();
                break;
            case "View all Deparments:":
                viewAllDepartments();
                break;

            case "Add Employee?":
                addEmployee();
                break;

            case "Add Role?":
                addRole();
                break;

            case "Add Department?":
                addDepartment();
                break;
                
            case "Update Employee Role:":
                updateEmployeeRole();
                break;

            case "Quit":
                quit();
                break;
        }
    });
};

function viewAllDepartments() {
    db.query(`SELECT * FROM department`, function (err, results) {
        console.table(results);
        init();
    });
};

function viewAllRoles() {
    db.query(`SELECT * FROM role`, function (err, results) {
        console.table(results);
        init();
    });
};

function viewAllEmployees() {
    db.query(`select e1.id, e1.first_name, e1.last_name, role.title, department.name as department, role.salary, concat(e2.first_name," ", e2.last_name) as manager from employee e1 INNER JOIN role  on e1.role_id=role.id INNER JOIN department on role.department_id=department.id LEFT JOIN employee e2  on e1.manager_id=e2.id`, function (err, results) {
        console.table(results);
        init();
    });
};

function addDepartment() {
    inquirer.prompt({
        type: 'input',
        message: 'What is the name of the department?',
        name: 'departmentName'

    }).then((answer) => {
        db.query(`INSERT INTO department (name) VALUES (?)`, answer.departmentName, function (err, results) {
            console.table(results);
            console.log(`Department added`);
            init();
        });
    });
};

function addRole() {
    inquirer.prompt([
        {
            type: "input",
            message: "Enter the employee's title",
            name: "roleTitle"
        },
        {
            type: "input",
            message: "Enter the employee's salary",
            name: "roleSalary"
        },
        {
            type: "input",
            message: "Enter the employee's department ID",
            name: "roleDept"
        }
    ])
        .then(function (res) {
            const title = res.roleTitle;
            const salary = res.roleSalary;
            const departmentID = res.roleDept;
            const query = `INSERT INTO role (title, salary, department_id) VALUES ("${title}", "${salary}", "${departmentID}")`;
            db.query(query, function (err, res) {
                if (err) {
                    throw err;
                }
                console.table(res);
                init();
            });
        });
}
function addEmployee() {
    inquirer.prompt([
        {
            type: "input",
            message: "Enter the employee's first name",
            name: "firstName"
        },
        {
            type: "input",
            message: "Enter the employee's last name",
            name: "lastName"
        },
        {
            type: "input",
            message: "Enter the employee's role ID",
            name: "addEmployRole"
        },
        {
            type: "input",
            message: "Enter the employee's manager ID",
            name: "addManager"
        }
    ])
        .then(function (res) {
            const firstName = res.firstName;
            const lastName = res.lastName;
            const employRoleID = res.addEmployRole;
            const employeeID = res.addManager;
            const query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${firstName}", "${lastName}", "${employRoleID}", "${employeeID}")`;
            db.query(query, function (err, res) {
                if (err) {
                    throw err;
                }
                console.table(res);
                init();
            });
        });
}
function updateEmployeeRole() {
    inquirer
        .prompt([
            {
                type: "list",
                message: "Enter the employee's name you want to be updated",
                name: "updateEmployee"
            },
            {
                type: "list",
                message: "Enter the new role for that employee",
                name: "newRole"
            }
        ])
        .then(function (res) {
            const updateEmployee = res.updateEmployee;
            const newRole = res.newRole;
            const queryUpdate = `UPDATE employee SET role_id = "${newRole}" WHERE id = "${updateEmployee}"`;
            db.query(queryUpdate, function (err, res) {
                if (err) {
                    throw err;
                }
                console.table(res);
                init();
            })
        });
}
function quit() {
    console.log(`Bye!`);
    process.exit();
}
init();
