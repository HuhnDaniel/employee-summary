const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const util = require("util");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const writeFileAsync = util.promisify(fs.writeFile);

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
    try {
        const employeesArr = [];
        let teamMember;

        // While the user wants to add another member, run this loop again
        do {
            teamMember = await promptUser();
            let employee;

            // Create object based on team member role
            switch (teamMember.role) {
                case "Manager":
                    employee = new Manager(teamMember.name, teamMember.id, teamMember.email, teamMember.officeNumber);
                    break;
                case "Engineer":
                    employee = new Engineer(teamMember.name, teamMember.id, teamMember.email, teamMember.github);
                    break;
                case "Intern":
                    employee = new Intern(teamMember.name, teamMember.id, teamMember.email, teamMember.school);
                    break;
            }

            // Populate array of employees with generated objects
            employeesArr.push(employee);
        } while (teamMember.addMember === true);

        // Convert array of employees into HTML
        const html = render(employeesArr);

        // Write html to output file
        await writeFileAsync(outputPath, html);

        console.log(`Successfully wrote to ${outputPath}`);
    } catch(err) {
        console.log(err);
    }
}

init();