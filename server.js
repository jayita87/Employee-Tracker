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
    console.log(`Connected to the employee_db database.`)
);

db.connect(err => {
    if (err) throw err;
    init();
})

function init() {
    inquirer.prompt([
        {
            type: "list",
            message: "What would you like to do?",
            name: "choice",
            choices: [
                "View All Employees?",
                "View All Employee's By Roles?",
                "View all Emplyees By Deparments",
                "Update Employee Role",
                "Add Employee?",
                "Add Role?",
                "Add Department?",
                "Quit"
            ]
        }
    ]) .then(function (answer) {
            switch (answer.choice) {
                case "View All Employees?":
                    viewAllEmployees();
                    break;

                case "View All Employee's By Roles?":
                    viewAllRoles();
                    break;
                case "View all Emplyees By Deparments":
                    viewAllDepartments();
                    break;

                case "Add Employee?":
                    addEmployee();
                    break;

                case "Update Employee":
                    updateEmployeeRole();
                    break;

                case "Add Role?":
                    addRole();
                    break;

                case "Add Department?":
                    addDepartment();
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
    db.query(`SELECT * FROM department`, function (err, results){
        console.table(results);
        init();
    });
};

function viewAllEmployees() {
    db.query(`SELECT * FROM employee`, function (err, results) {
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
        connection.query(query, function (err, res) {
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
        const employeeID = res.addEmployee;
        const query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${firstName}", "${lastName}", "${employRoleID}", "${employeeID}")`;
        connection.query(query, function (err, res) {
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
        type: "input",
        message: "Enter the employee's ID you want to be updated",
        name: "updateEmployee"
      },
      {
        type: "input",
        message: "Enter the new role ID for that employee",
        name: "newRole"
      }
    ])
    .then(function (res) {
        const updateEmployee = res.updateEmploy;
        const newRole = res.newRole;
        const queryUpdate = `UPDATE employee SET role_id = "${newRole}" WHERE id = "${updateEmployee}"`;
        connection.query(queryUpdate, function (err, res) {
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
  