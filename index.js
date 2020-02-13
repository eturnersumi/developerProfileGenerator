const inquirer = require('inquirer');
const axios = require("axios");
const fs = require("fs");
const util = require("util");
const generateHTML = require('./generateHTML')
const writeFileAsync = util.promisify(fs.writeFile);
const convertHTMLToPDF = require("pdf-puppeteer");

var dataobj = {};

function getAnswers() {
    //return inquirer.prompt([
 inquirer.prompt([
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
        //console.log( answers);

        const queryURL = `https://api.github.com/users/${answers.username}`;        
        axios.get(queryURL).then(function(result) {
        var color = answers.color;
        
        const queryURL2 = `https://api.github.com/users/${answers.username}/repos`;
         axios.get(queryURL2).then(function(starsData) {

        let repos = starsData.data.length;
            //console.log(`Number of repos = ${repos}`)
        //loop to calculate the star
        let stars = 0;
        //console.log(starsData);
       
        for (let i = 0; i < starsData.data.length; i++) {
            //console.log(starsData.data[i].stargazers_count)
             stars = stars + starsData.data[i].stargazers_count
             //repos = starsData.data[i].id.length;
             //console.log(starsData.data[i].name)
        }
        

        dataobj = {color, stars, repos, ...result.data };
        //console.log(object)
  
        const html = generateHTML(dataobj)
          
        console.log(html)
        writeFileAsync("profile.html", html);
        console.log("Successfully wrote to hmtl")
            //  convert html to pdf
            convertHTMLToPDF(html, callback)
        // pdf.create(html, options).toFile('developer-profile.pdf', function(err, res) {
        //     if (err) return console.log(err);
        //     console.log(res);
            
        // })
            })
        })

    })  
 
 
 var callback = function(pdf) {
    //  res.setHeader("Content-Type", "application/pdf");
    //  res.toFile('developer-profile.pdf', function(err, res) {
    //      if (err) return console.log(err);
         //console.log(pdf)
         writeFileAsync("developer-profile.pdf", pdf)
         console.log("Successfully wrote to pdf")
    //  })
 }
}

getAnswers()
