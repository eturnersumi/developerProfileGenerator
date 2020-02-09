const inquirer = require('inquirer');
const axios = require("axios");
const fs = require("fs");
const util = require("util");
const generateHTML = require('./generateHTML')
const writeFileAsync = util.promisify(fs.writeFile);



function getAnswers() {
    //return inquirer.prompt([
    return inquirer.prompt([
    { 
        type: "input",
        name: "username",
        message: "Enter your Github username"
    },
    {
        type: "input",
        name: "color",
        message: "What is your favorite color?"
    }
    ])
    .then(answers => {
        return answers.color;
    })
    // .then(function({ username }) {
    //     const queryURL = `https://api.github.com/users/${username}`;        
    //     axios.get(queryURL).then(function(result) {
    //     return result.data.avatar_url, result.data.login, result.data.location, result.data.html_url, result.data.Bio, result.data.followers, result.data.following;
    //     })

    //     const queryURL1 = `https://api.github.com/users/${username}/starred`;
    //     axios.get(queryURL1).then(function(result) {
    //     return result.data.length;
    //     })
        
    //     const queryURL2 = `https://api.github.com/users/${username}/repos`;
    //     axios.get(queryURL2).then(function(result) {
    //     return result.data.length;
    //     })  
    // })


// function writeToFile(fileName, data) {
 
 }

async function init() {
    console.log("Greetings wonderful person!")
    try {
        const data = await getAnswers();
        const html = generateHTML();
        await writeFileAsync("profile.pdf", html);
        console.log("Successfully wrote to pdf")
    } catch(err) {
        console.log(err);
    }
}

init();

//module.exports = getAnswers();
// module.exports = {
//     username,
//     color
// }
//module.exports = answers.color;