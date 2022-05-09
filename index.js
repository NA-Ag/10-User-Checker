/* Variables start here */ 
const inquirer = require('inquirer');
const fs = require('fs');
const generateHTML = require("./src/generateHTML.js");

const Manager = require('./lib/manager');
const Engineer = require('./lib/engineer')
const Intern = require('./lib/intern')

let team = [];

// Stack overflow solution to email validation implemented. 
// https://stackoverflow.com/questions/65189877/how-can-i-validate-that-a-user-input-their-email-when-using-inquirer-npm

// const memberQuestions = [
//     {
//         type: 'list',
//         messaage: 'What is your role?',
//         name: 'role',
//         choices: ['Manager', 'Engineer', 'Intern']
//     },
//     {
//         type: 'input',
//         message: 'What is your name?',
//         name: 'name'
//     },
//     {
//         type: 'input',
//         message: 'What is your ID number?',
//         name: 'id'
//     },
//     {
//         type: 'input',
//         message: 'What is your email address?',
//         name: 'email',
//         validate: function(email)
//         {
//             // Regex mail check (return true if valid mail)
//             return /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/.test(email);
//         }
//     },
//     {
//         type: 'input',
//         message: "Additional info i.e manager's office, engineer's github or intern's school",
//         name: "extra"
//     }
// ];
// For future update into single object


// Manager Questions
const managerQuestions = [
    {
        type: 'input',
        name: 'managerName',
        message: "Input Team Manager's name"
    },
    {
        type: 'input',
        name: 'managerId',
        message: "Input Team Manager's Id?"
    },
    {
        type: 'input',
        name: 'managerEmail',
        message: "Input Team Manager's email",
        validate: function(manageremail)
        {
            return /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/.test(manageremail);
        }
    },
    {
        type: 'input',
        name: 'managerOffice',
        message: "Input Team Manager's office number"
    }
];

// Engineer Questions
const engineerQuestions = [
    {
        type: 'input',
        name: 'engineerName',
        message: "Input Engineer's name"
    },
    {
        type: 'input',
        name: 'engineerId',
        message: "Input Engineer Id"
    },
    {
        type: 'input',
        name: 'engineerEmail',
        message: "Input Engineer's email",
        validate: function(engineeremail)
        {
            return /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/.test(engineeremail);
        }
    },
    {
        type: 'input',
        name: 'engineerGithub',
        message: "Input Engineer's Github"
    }
];

// Intern Questions
const internQuestions = [
    {
        type: 'input',
        name: 'internName',
        message: "Input Intern's name"
    },
    {
        type: 'input',
        name: 'internId',
        message: "Input Intern's Id"
    },
    {
        type: 'input',
        name: 'internEmail',
        message: "Input Intern's email",
        validate: function(internemail)
        {
            return /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/.test(internemail);
        }
    },
    {
        type: 'input',
        name: 'internSchool',
        message: "Input Intern's school"
    }
];
/* Variables end here */

/* Functions start here */
function addEmployee() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'addMember',
                message: 'Specify who you would like to add',
                choices: ['Engineer', 'Intern', "None, i don't want to add another member"]
            }
        ])
        .then((answers) => {
            if (answers.addMember === "Engineer") 
            {
                inquirer
                    .prompt(engineerQuestions)
                    .then((answer) => {
                        const engineer = new Engineer(answer.engineerName, answer.engineerId, answer.engineerEmail, answer.engineerGithub)
                        team.push(engineer);
                        addEmployee();
                    })
                    .catch((err) => console.log(err))
            } 

            else if (answers.addMember === "Intern") 
            {
                inquirer
                    .prompt(internQuestions)
                    .then((answer) => {
                        const intern = new Intern(answer.internName, answer.internId, answer.internEmail, answer.internSchool)
                        team.push(intern);
                        addEmployee();
                    })
                    .catch((err) => console.log(err))
            } 

            else
            {
                console.log(team)
                writeToFile("./dist/index.html", team)
                return;
            }
        })
        .catch((err) => console.log(err))
}

function writeToFile(fileName, data) {
    let teamInfo = generateHTML(data);
    fs.writeFile(fileName, teamInfo, (err) => {
        err ? console.log(err) : console.log("Members updated succesgfully");
    })
}


function init() {
    inquirer
        .prompt(managerQuestions)
        .then((answer) => {
            const manager = new Manager(answer.managerName, answer.managerId, answer.managerEmail, answer.managerOffice)
            team.push(manager);
            addEmployee();
        })
        .catch((err) => console.log(err))
}

/* Functions end here */
init();