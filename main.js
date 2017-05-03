// Note to self: See this if you get to front end: http://code.runnable.com/VGQwstBV-f99gxep/flash-card-css3-jquery-for-javascript AND http://stackoverflow.com/questions/36510663/javascript-flash-card-script-how-can-i-get-it-to-toggle
// See also https://sittinginoblivion.com/wiki/scope-safe-constructors-javascript to implement

// json generated on this project folder with "npm init --yes"
// require inquirer - Note to self: installed this npm package and saved locally to this project follder with "npm install inquirer --save"
var inquirer = require("inquirer");

// require fs  -  Note to self: installed this npm package and saved locally to this project follder with "npm install fs --save"
var fs = require("fs");

// require basicCard.js
var basicCard = require("./BasicCard.js");

// require clozeCard.js
var clozeCard = require("./ClozeCard.js");

inquirer.prompt([{
    name: "authorTrivia",
    message: "Are you ready to answer a few simple questions?",
    type: "list",
    choices: [{
        name: "Sure!"
    }, {
        name: "No-I'm out of here!"
    }]
}]).then(function(answer) {
    if (answer.authorTrivia === "No-I'm out of here!") {
        console.log("Adios, Amigo! Come back soon!");
    } else if (answer.authorTrivia === "Sure!") {
        flashCards();
    }
});

// Starts counting questions at 0 -- this way, you can add as many as you like without specifying a specific number for the array length.
var count = 0;

var flashCards = function() {
    // pulls the data from "questions.txt" file to avoid using "new"
    fs.readFile("./questions.txt", "utf8", function(error, data) {
        //if there is an error, log it
        if (error) {
            console.log("Error occurred: " + error);
        }
        // Note to self - see this https://www.w3schools.com/jsref/jsref_split.asp/// / Note to self: MM explained this and helped re: filter and "notBlank" -- pick his brain more on this!
        var questions = data.split(";");
        var notBlank = function(value) {
            return value;
        };
        questions = questions.filter(notBlank);

        questionDisplay(questions, count);
    });
};
// using parsedQuestion and clozeDeleted
// Note to self: MM explained this and helped re: array stuff
var questionDisplay = function(array, index) {
    question = array[index];
    var parsedQuestion = JSON.parse(question);
    var questionText;
    var correctReponse;
    if (parsedQuestion.type === "basic") {
        questionText = parsedQuestion.front;
        correctReponse = parsedQuestion.back;
    } else if (parsedQuestion.type === "cloze") {
        questionText = parsedQuestion.clozeDeleted;
        correctReponse = parsedQuestion.cloze;
    }
    inquirer.prompt([{
        name: "response",
        message: questionText
    }]).then(function(answer) {
        if (answer.response === correctReponse) {
            if (parsedQuestion.type === "basic") {
                console.log("CORRECT!");
                console.log("\n");
                console.log("The answer is: " + parsedQuestion.back + ".");
                console.log("\n");
            } else if (parsedQuestion.type === "cloze") {
                console.log("\nCORRECT!\n");
                console.log(parsedQuestion.text);
            };

            if (index < array.length - 1) {
                questionDisplay(array, index + 1);

            } else {
                console.log("\n***********************************");
                console.log("NO MORE QUESTIONS - GAME OVER");
                playAgain();
            }
        } else {
            if (parsedQuestion.type === "basic") {
                console.log("WRONG!");
                console.log("\n");
                console.log("The answer is: " + parsedQuestion.back + ".");
                console.log("\n***********************************");
                console.log("\n");
            } else if (parsedQuestion.type === "cloze") {
                console.log("\nWRONG!\n");
                console.log(parsedQuestion.text);
            };

            if (index < array.length - 1) {
                questionDisplay(array, index + 1);

            } else {

                console.log("++NO MORE QUESTIONS - GAME OVER++");
                // console.log("\n***********************************");
                playAgain();
                     }
           }
         });
};

var playAgain = function() {

    inquirer.prompt([{
        name: "playmore",
        message: "Play again?",
        type: "list",
        choices: [{
            name: "No"
        }, {
            name: "Sure!"
        }]
    }]).then(function(answer) {

        if (answer.playmore === "No") {
            console.log("OK -- BYE!!!");
        } else if (answer.playmore === "Sure!") {
            flashCards();
        }
    });
}
