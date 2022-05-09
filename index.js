/* Variables start here */ 
const inquirer = require('inquirer');
const fs = require('fs');
const genHTML = require("./src/generateHTML.js");

const Manager = require('./lib/manager');
const Engineer = require('./lib/engineer')
const Intern = require('./lib/intern')

var team = [];

/* Variables end here */

// Questions for the manager (assuming they are the one using the app)
const managerQuestions = [
    {
        type: 'input',
        name: 'managername',
        message: "This command line app will generate a roster page for your team. First, what is the team manager's name?"
    },
    {
        type: 'input',
        name: 'managerid',
        message: "What is the team manager's employee ID?"
    },
    {
        type: 'input',
        name: 'manageremail',
        message: "What is the team manager's email?",
        validate: function(manageremail)
        {
            return /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/.test(manageremail);
        }
    },
    {
        type: 'input',
        name: 'manageroffice',
        message: "What is the team manager's office number?"
    }
];

// Questions to get Engineer info
const engineerQuestions = [
    {
        type: 'input',
        name: 'engineername',
        message: "What is the engineer's name?"
    },
    {
        type: 'input',
        name: 'engineerid',
        message: "What is the engineer's employee ID?"
    },
    {
        type: 'input',
        name: 'engineeremail',
        message: "What is the engineer's email?",
        validate: function(engineeremail)
        {
            return /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/.test(engineeremail);
        }
    },
    {
        type: 'input',
        name: 'engineergithub',
        message: "What is the engineer's Github?"
    }
];

// Questions to get Intern info
const internQuestions = [
    {
        type: 'input',
        name: 'internname',
        message: "What is the intern's name?"
    },
    {
        type: 'input',
        name: 'internid',
        message: "What is the intern's employee ID?"
    },
    {
        type: 'input',
        name: 'internemail',
        message: "What is the intern's email?",
        validate: function(internemail)
        {
            return /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/.test(internemail);
        }
    },
    {
        type: 'input',
        name: 'internschool',
        message: "What is the intern's school?"
    }
];

// The manager will be prompted these questions if they would like to add Employees
// If they are done, generate the HTML file
function addEmployee() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'addmember',
                message: 'Which type of team member would you like to add?',
                choices: ['Engineer', 'Intern', "I am done adding team members"]
            }
        ])
        .then((answers) => {
            if (answers.addmember === "Engineer") {
                addEngineer();
            } else if (answers.addmember === "Intern") {
                addIntern();
            } else {
                console.log(team)
                writeToFile("./dist/roster.html", team)
                // console.log(team[0].getRole())
                // console.log(team[0] instanceof Manager)
                return;
            }
        })
        .catch((err) => console.log(err))
}

// Adds an instance of Engineer to the team array
function addEngineer() {
    inquirer
        .prompt(engineerQuestions)
        .then((answer) => {
            const engineer = new Engineer(answer.engineername, answer.engineerid, answer.engineeremail, answer.engineergithub)
            team.push(engineer);
            addEmployee();
        })
        .catch((err) => console.log(err))
}

// Adds an instance of Intern to the team array
function addIntern() {
    inquirer
        .prompt(internQuestions)
        .then((answer) => {
            const intern = new Intern(answer.internname, answer.internid, answer.internemail, answer.internschool)
            team.push(intern);
            addEmployee();
        })
        .catch((err) => console.log(err))
}

// Function to write HTML
function writeToFile(fileName, data) {
    let teamInfo = genHTML(data);
    fs.writeFile(fileName, teamInfo, (err) => {
        err ? console.log(err) : console.log("COOK IT UP COOK IT UP");
    })
}

// Function to initialize app
function init() {
    inquirer
        .prompt(managerQuestions)
        .then((answer) => {
            const manager = new Manager(answer.managername, answer.managerid, answer.manageremail, answer.manageroffice)
            team.push(manager);
            addEmployee();
        })
        .catch((err) => console.log(err))
}

// Function call to initialize app
init();