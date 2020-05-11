const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
function promptUser() {
    return inquirer.prompt([
        {
            type: "input",
            message: "Input employee name: ",
            name: "name"
        },
        {
            type: "list",
            message: "What role does this employee fill?",
            choices: ["Manager", "Engineer", "Intern"],
            name: "role"
        },
        {
            type: "input",
            message: "Input employee ID: ",
            name: "id"
        },
        {
            type: "input",
            message: "Input employee email address: ",
            name: "email"
        },
        // Only ask for office number if employee is a manager
        {
            type: "input",
            message: "Input manager office number: ",
            when: function(answers) {
                return answers.role === "Manager";
            },
            name: "officeNumber"
        },
        // Only ask for GitHub username if employee is an engineer
        {
            type: "input",
            message: "Input GitHub username: ",
            when: function(answers) {
                return answers.role === "Engineer";
            },
            name: "github"
        },
        // Only ask for school if employee is an intern
        {
            type: "input",
            message: "Input intern school name: ",
            when: function(answers) {
                return answers.role === "Intern";
            },
            name: "school"
        },
        {
            type: "confirm",
            message: "Would you like to add another team member?",
            name: "addMember"
        }
    ]);
}

async function init() {
    const employeesArr = [];
    let employee;

    do {
        employee = await promptUser();
        employeesArr.push(employee);
    } while (employee.addMember === true);

    console.log(employeesArr);
}

init();

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
