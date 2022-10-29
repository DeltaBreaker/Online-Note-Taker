//----- Import needed modules -----
const fs = require("fs");
const uuid = require("uuid");
const notes = require('express').Router();
//---------------------------------

//----- Loads the db.json file into an array to use for storing notes -----
const noteDB = require("./db/db.json");
const notesArray = [];

for(const i of noteDB) {
    notesArray.push(i);
}
//-------------------------------------------------------------------------

//---------- Create endpoints for the /api/notes route ----------
// Returns the list of notes
notes.get('/', (req,res) => {
    res.send(JSON.stringify(notesArray));
});

// Takes in a note object and appends that to the array. Updates the json file after
notes.post('/', (req,res) => {
    notesArray.push({
        id: uuid.v4(),
        title: req.body.title,
        text: req.body.text
    });
    fs.writeFile("./db/db.json", JSON.stringify(notesArray), (error) => {
        (error) ? console.log("Error writing to file.") : console.log("Notes db updated.");
    });
    res.sendStatus(200);
});

// Takes in a note id parameter and uses that to delete a specific note
notes.delete("/:id", (req, res) => {
    for(let i = 0; i < notesArray.length; i++) {
        if(notesArray[i].id == req.params.id) {
            notesArray.splice(i, 1);
            break;
        }
    }
    res.sendStatus(200);
});
//--------------------------------------------------------------

module.exports = notes;