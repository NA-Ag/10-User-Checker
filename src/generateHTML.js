const Employee = require('../lib/employee');
const Manager = require('../lib/manager');
const Engineer = require('../lib/engineer');
const Intern = require('../lib/intern');

var generateManager = (memberInfo) => {
    return `<div class="col-lg-4 col-md-6 col-12 pb-5">
    <div class="card animate__animated animate__bounceInRight">
      <div class="card-body manager">
        <h5 class="card-title">${memberInfo.name}</h5>
        <p class="card-text">Manager</p>
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">ID: ${memberInfo.id}</li>
        <li class="list-group-item">Email: <a href="mailto:${memberInfo.email}" target="_blank" class="card-link">${memberInfo.email}</a></li>
        <li class="list-group-item">Office: ${memberInfo.office}</li>
      </ul>
    </div>
  </div>
  
  `
}

var generateEngineer = (memberInfo) => {
    return `<div class="col-lg-4 col-md-6 col-12 pb-5">
    <div class="card animate__animated animate__bounceInRight">
      <div class="card-body engineer">
        <h5 class="card-title">${memberInfo.name}</h5>
        <p class="card-text">Engineer</p>
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">ID: ${memberInfo.id}</li>
        <li class="list-group-item">Email: <a href="mailto:${memberInfo.email}" target="_blank" class="card-link">${memberInfo.email}</a></li>
        <li class="list-group-item">Github: <a href="https://github.com/${memberInfo.github}" target="_blank" class="card-link">${memberInfo.github}</a></li>
      </ul>
    </div>
  </div>
  
  `
}

var generateIntern = (memberInfo) => {
    return `<div class="col-lg-4 col-md-6 col-12 pb-5">
    <div class="card animate__animated animate__bounceInRight">
      <div class="card-body intern">
        <h5 class="card-title">${memberInfo.name}</h5>
        <p class="card-text">Intern</p>
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">ID: ${memberInfo.id}</li>
        <li class="list-group-item">Email: <a href="mailto:${memberInfo.email}" target="_blank" class="card-link">${memberInfo.email}</a></li>
        <li class="list-group-item">School: ${memberInfo.school}</li>
      </ul>
    </div>
  </div>
  
  `
}

function generateHTML(data) {
    var fileString = `<!DOCTYPE html>
    <html lang="en">  
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
      <link href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" rel="stylesheet"/>
      <link rel="stylesheet" href="./normalize.css"/>
      <link rel="stylesheet" href="./style.css">
      <title>Team Viewer</title>
    </head>
    
    <body>
      <header class="page-header sticky-top">
        <h1>Current Team</h1>
      </header>
    
      <div class="container mt-3">
        <div class="row align-items-center" id="members">
    
          `;
    data.forEach(member => {
        if (member instanceof Manager) {
            var manager = generateManager(member);
            fileString += manager;
        } else if (member instanceof Engineer) {
            var engineer = generateEngineer(member);
            fileString += engineer;
        } else {
            var intern = generateIntern(member);
            fileString += intern;
        }
    });
    fileString += `</div>
    </div>
  </body>
  </html>`;
    return fileString;
}

module.exports = generateHTML;