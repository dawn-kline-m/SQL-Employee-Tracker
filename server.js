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
                    "Add a Role",
                    "Add an Employee",
                    "Update an Employee Role",
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
                    console.log("Exiting Employee Tracker");
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
function addDepartment() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'department',
            message: 'What is the name of the department?',
        }
    ]).then((answer) => {
        const sql = `INSERT INTO department(dept_name) VALUES('${answer.department}');`
        db.query(sql, (err, res) => {
            if (err) {
                console.log(err);
                return;
            }
            console.log("Added " + answer.department + " to the database")
            startEmpTracker();
        });
    });
};
function addRole() {
    const sql2 = `SELECT * FROM department`;
    db.query(sql2, (error, response) => {
        departmentList = response.map(departments => ({
            name: departments.dept_name,
            value: departments.id
        }));
        return inquirer.prompt([
            {
                type: 'input',
                name: 'title',
                message: 'What is the name of the role?',
            },
            {
                type: 'input',
                name: 'salary',
                message: 'What is the salary of the role?',
            },
            {
                type: 'list',
                name: 'department',
                message: 'Which Department does the role belong to?',
                choices: departmentList
            }
        ]).then((answers) => {
            const sql = `INSERT INTO role SET title='${answers.title}', salary= ${answers.salary}, department_id= ${answers.department};`
            db.query(sql, (err, res) => {
                if (err) {
                    console.log(err);
                    return;
                }
                console.log("Added " + answers.title + " to the database")
                startEmpTracker();
            });
        });
    });
};
// Function to add an employee
function addEmployee() {
    // Retrieve list of roles from the database
    db.query("SELECT id, title FROM role", (error, results) => {
        if (error) {
            console.error(error);
            return;
        }

        const role = results.map(({ id, title }) => ({
            name: title,
            value: id,
        }));

        // Retrieve list of employees from the database to use as managers
        db.query(
            'SELECT id, CONCAT(first_name, " ", last_name) AS name FROM employees',
            (error, results) => {
                if (error) {
                    console.error(error);
                    return;
                }
                const managers = results.map(({ id, name }) => ({
                    name,
                    value: id,
                }));

                // Prompt the user for employee information
                inquirer
                    .prompt([
                        {
                            type: "input",
                            name: "firstName",
                            message: "Enter the employee's first name:",
                        },
                        {
                            type: "input",
                            name: "lastName",
                            message: "Enter the employee's last name:",
                        },
                        {
                            type: "list",
                            name: "roleId",
                            message: "Select the employee role:",
                            choices: role,
                        },
                        {
                            type: "list",
                            name: "managerId",
                            message: "Select the employee manager:",
                            choices: [
                                { name: "None", value: null },
                                ...managers,
                            ],
                        },
                    ])
                    .then((answers) => {
                        // Insert the employee into the database
                        const sql =
                            "INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)";
                        const values = [
                            answers.firstName,
                            answers.lastName,
                            answers.roleId,
                            answers.managerId,
                        ];
                        db.query(sql, values, (error) => {
                            if (error) {
                                console.error(error);
                                return;
                            }

                            console.log("Employee added successfully");
                            startEmpTracker();
                        });
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            }
        );
    });
}
// function to update an employee role
function updateRole() {
    const queryEmployees =
        "SELECT employees.id, employees.first_name, employees.last_name, role.title FROM employees LEFT JOIN role ON employees.role_id = role.id";
    const queryRoles = "SELECT * FROM role";
    db.query(queryEmployees, (err, resEmployees) => {
        if (err) throw err;
        db.query(queryRoles, (err, resRoles) => {
            if (err) throw err;
            inquirer
                .prompt([
                    {
                        type: "list",
                        name: "employee",
                        message: "Select the employee to update:",
                        choices: resEmployees.map(
                            (employees) =>
                                `${employees.first_name} ${employees.last_name}`
                        ),
                    },
                    {
                        type: "list",
                        name: "role",
                        message: "Select the new role:",
                        choices: resRoles.map((role) => role.title),
                    },
                ])
                .then((answers) => {
                    const employee = resEmployees.find(
                        (employee) =>
                            `${employee.first_name} ${employee.last_name}` ===
                            answers.employee
                    );
                    const role = resRoles.find(
                        (role) => role.title === answers.role
                    );
                    const query =
                        "UPDATE employees SET role_id = ? WHERE id = ?";
                    db.query(
                        query,
                        [role.id, employee.id],
                        (err, res) => {
                            if (err) throw err;
                            console.log(
                                `Updated ${employee.first_name} ${employee.last_name}'s role to ${role.title} in the database!`
                            );
                            // restart the application
                            startEmpTracker();
                        }
                    );
                });
        });
    });
}

