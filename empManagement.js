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

// * Update employee roles

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



// // function to handle posting new items up for auction
// function postAuction() {
//   // prompt for info about the item being put up for auction
//   inquirer
//     .prompt([
//       {
//         name: "item",
//         type: "input",
//         message: "What is the item you would like to submit?"
//       },
//       {
//         name: "category",
//         type: "input",
//         message: "What category would you like to place your auction in?"
//       },
//       {
//         name: "startingBid",
//         type: "input",
//         message: "What would you like your starting bid to be?",
//         validate: function(value) {
//           if (isNaN(value) === false) {
//             return true;
//           }
//           return false;
//         }
//       }
//     ])
//     .then(function(answer) {
//       // when finished prompting, insert a new item into the db with that info
//       connection.query(
//         "INSERT INTO auctions SET ?",
//         {
//           item_name: answer.item,
//           category: answer.category,
//           starting_bid: answer.startingBid || 0,
//           highest_bid: answer.startingBid || 0
//         },
//         function(err) {
//           if (err) throw err;
//           console.log("Your auction was created successfully!");
//           // re-prompt the user for if they want to bid or post
//           start();
//         }
//       );
//     });
// }

// function bidAuction() {
//   // query the database for all items being auctioned
//   connection.query("SELECT * FROM auctions", function(err, results) {
//     if (err) throw err;
//     // once you have the items, prompt the user for which they'd like to bid on
//     inquirer
//       .prompt([
//         {
//           name: "choice",
//           type: "rawlist",
//           choices: function() {
//             var choiceArray = [];
//             for (var i = 0; i < results.length; i++) {
//               choiceArray.push(results[i].item_name);
//             }
//             return choiceArray;
//           },
//           message: "What auction would you like to place a bid in?"
//         },
//         {
//           name: "bid",
//           type: "input",
//           message: "How much would you like to bid?"
//         }
//       ])
//       .then(function(answer) {
//         // get the information of the chosen item
//         var chosenItem;
//         for (var i = 0; i < results.length; i++) {
//           if (results[i].item_name === answer.choice) {
//             chosenItem = results[i];
//           }
//         }

//         // determine if bid was high enough
//         if (chosenItem.highest_bid < parseInt(answer.bid)) {
//           // bid was high enough, so update db, let the user know, and start over
//           connection.query(
//             "UPDATE auctions SET ? WHERE ?",
//             [
//               {
//                 highest_bid: answer.bid
//               },
//               {
//                 id: chosenItem.id
//               }
//             ],
//             function(error) {
//               if (error) throw err;
//               console.log("Bid placed successfully!");
//               start();
//             }
//           );
//         }
//         else {
//           // bid wasn't high enough, so apologize and start over
//           console.log("Your bid was too low. Try again...");
//           start();
//         }
//       });
//   });
// }
