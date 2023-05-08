const inquirer = require("inquirer");
const mysql = require("mysql2");

// create a MySQL connection
const db = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "rootroot",
        database: "employeeTracker_db",
    },
    console.log(`Connected to the employeeTracker_db database.`)
);

db.connect(function (err) {
    if (err) throw err;
    console.log("**************************************");
    console.log("           EMPLOYEE TRACKER           ");
    console.log("**************************************");
    startEmpTracker();
});

function startEmpTracker() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'action',
                message: 'What would you like to do?',
                choices: [
                    "View all Departments",
                    "View all Roles",
                    "View all Employees",
                    "Add a Department",
                    "Exit",
                ],
            },
        ])
        .then((answer) => {
            switch (answer.action) {
                case "View all Departments":
                    viewAllDepartments();
                    break;
                case "View all Roles":
                    viewAllRoles();
                    break;
                case "View all Employees":
                    viewAllEmployees();
                    break;
                case "Add a Department":
                    addDepartment();
                    break;
                case "Add a Role":
                    addRole();
                    break;
                case "Add an Employee":
                    addEmployee();
                    break;
                case "Update an Employee Role":
                    updateRole();
                    break;


                case "Exit":
                    db.end();
                    console.log("This is the end");
                    break;
            }
        });
}

// function to view all departments
function viewAllDepartments() {
    const query = "SELECT * FROM department";
    db.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        // restart the application
        startEmpTracker();
    });
}
function viewAllRoles() {
    const sql = `SELECT role.id, title, salary, department.dept_name FROM role
    INNER JOIN department
    ON role.department_id = department.id
    
    `;
    db.query(sql, (err, res) => {
        if (err) {
            console.log(err);
            return;
        }
        console.table(res);
        startEmpTracker();
    });
};
function viewAllEmployees() {
    const sql = `
    SELECT employees.id, employees.first_name, employees.last_name, role.title AS role, 
    role.salary, department.dept_name AS department,  CONCAT(manager.first_name, " ", manager.last_name) as manager
    FROM employees
    INNER JOIN role
    ON employees.role_id = role.id
    INNER JOIN department
    ON role.department_id = department.id
    LEFT JOIN employees AS manager
    On employees.manager_id = manager.id;
    `
    db.query(sql, (err, res) => {
        if (err) {
            console.log(err);
            return;
        }
        console.table(res);
        startEmpTracker();
    });
};
