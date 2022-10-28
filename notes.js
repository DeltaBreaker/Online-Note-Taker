const fs = require("fs");
const uuid = require("uuid");
const notes = require('express').Router();
const noteDB = require("./db/db.json");
const notesArray = [];

for(const i of noteDB) {
    notesArray.push(i);
}

notes.get('/', (req,res) => {
    res.send(JSON.stringify(notesArray));
});

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

module.exports = notes;