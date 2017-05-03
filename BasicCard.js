
// This file defines a Node module that exports a constructor for creating "basic" flashcards, e.g., "module.exports = BasicCard"

// require fs needed to read questions in questions.txt file

var fs = require("fs");

module.exports = BasicCard;

// constructor for BasicCard, which should accept 2 arguments - "front" and "back", where "front" contains the text on the front of the card, and "back" should contain the text on the back of the card (the answer to the question on the front of the card).

function BasicCard(front, back) {
    this.front = front;
    this.back = back;
}
