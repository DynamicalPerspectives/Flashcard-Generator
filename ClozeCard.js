
// / This file defines a Node module that exports a constructor for creating "cloze-deletion" flashcards, e.g., "module.exports = ClozeCard"

// require fs needed to read questions in questions.txt file

var fs = require("fs");

module.exports = ClozeCard;

// constructor for ClozeFlashcard which should have a "cloze" property that contains only the  cloze-deleted portion of the text.
function ClozeCard(text, cloze) {
    this.text = text;
    this.cloze = cloze;
    this.clozeDeleted = this.text.replace(this.cloze, "_____");

}
