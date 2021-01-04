require('dotenv').config();
var mysql = require("mysql");
var inquirer = require("inquirer");
const cTable = require('console.table');


// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: process.env.DB_PASS,
  database: "employee_DB"
});

connection.connect(function (err) {
  if (err) throw err;
  start();
});

// function which starts program and prompts user for choice of action
function start() {
  inquirer
    .prompt({
      name: "mainStart",
      type: "list",
      message: "Welcome to Employee Management! What would you like to do?",
      choices: [
        "View employees",
        "View roles",
        "View departments",
        "Add employee",
        "Add role",
        "Add department",
        "Update employee role",
        "Exit"
      ]
    })
    .then(function (answer) {

      if (answer.mainStart === "View employees") {
        viewEmployees();
      }
      else if (answer.mainStart === "View roles") {
        viewRoles();
      }
      else if (answer.mainStart === "View departments") {
        viewDepartments();
      }
      else if (answer.mainStart === "Add employee") {
        addEmployee();
      }
      else if (answer.mainStart === "Add role") {
        addRole();
      }
      else if (answer.mainStart === "Add department") {
        addDepartment();
      }
      else if (answer.mainStart === "Update employee role") {
        updateRole();
      }
      else {
        connection.end();
      }
    });
}


function viewEmployees() {
  connection.query("SELECT * FROM employee;", function (err, res) {
    if (err) throw err;
    console.table('employee', res);
  })
  start();
}

function viewRoles() {
  connection.query("SELECT * FROM role;", function (err, res) {
    if (err) throw err;
    console.table('role', res);
  })
  start();
}

function viewDepartments() {
  connection.query("SELECT * FROM department;", function (err, res) {
    if (err) throw err;
    console.table('department', res);
  })
  start();
}

function addEmployee() {
  inquirer.prompt([
    {
      name: "first_name",
      type: "input",
      message: "Enter employee's first name:"
    },
    {
      name: "last_name",
      type: "input",
      message: "Enter employee's last name:"
    },
    {
      name: "role_id",
      type: "input",
      message: "Enter employee's role id:"
    },
    {
      name: "manager_id",
      type: "input",
      message: "Enter employee's manager id:"
    }])
    .then(function (answer) {
      connection.query(
        "INSERT INTO employee SET ?",
        {
          first_name: answer.first_name,
          last_name: answer.last_name,
          role_id: answer.role_id,
          manager_id: answer.manager_id
        },
        function (err) {
          if (err) throw err;
          console.log("success!");
          start();
        }
      );
    });
}

function addRole() {
  inquirer.prompt([
    {
      name: "title",
      type: "input",
      message: "Enter role title:"
    },
    {
      name: "salary",
      type: "input",
      message: "Enter role salary:"
    },
    {
      name: "department_id",
      type: "input",
      message: "Enter role department id:"
    }])
    .then(function (answer) {
      connection.query(
        "INSERT INTO role SET ?",
        {
          title: answer.title,
          salary: answer.salary,
          department_id: answer.department_id
        },
        function (err) {
          if (err) throw err;
          console.log("success!");
          start();
        }
      );
    });
}

function addDepartment() {
  inquirer.prompt([
    {
      name: "name",
      type: "input",
      message: "Enter department name:"
    }])
    .then(function (answer) {
      connection.query(
        "INSERT INTO department SET ?",
        {
          name: answer.name,
        },
        function (err) {
          if (err) throw err;
          console.log("success!");
          start();
        }
      );
    });
}

function updateRole() {
  inquirer.prompt([
    {
      name: "employee_id",
      type: "input",
      message: "Enter employee id:"
    }, 
    {
      name: "employee_new",
      type: "input",
      message: "Enter employee's new role:"
      }])
  .then(function(answer) {
    connection.query(
      "UPDATE employee SET ? WHERE ?",
      [
        {
          role_id: answer.employee_new
        },
        {
          role_id: answer.employee_id
        }
      ],
      function(err) {
        if (err) throw err;
        console.log("success!");
        start();
      }
    );
  });
}

