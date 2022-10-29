//---------- Import all needed modules ----------
const express = require("express");
const path = require("path");
const notesRouter = require("./notes.js");
//-----------------------------------------------

//----- Create the port and express variabled needed -----
const PORT = process.env.PORT || 3001;
const app = express();
//--------------------------------------------------------

//----- Set up the server abilities and apply custom route -----
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/api/notes", notesRouter);
//--------------------------------------------------------------

//----- Create endpoints for html files -----
app.get('/notes', (req,res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.get('/*', (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);
//-------------------------------------------

//----- Start listening for requests -----
app.listen(PORT, () =>
  console.log("Listening for requests.")
);