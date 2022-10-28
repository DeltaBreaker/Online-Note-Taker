const express = require("express");
const path = require('path');

const PORT = process.env.port || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/404.html'))
);

app.listen(PORT, () =>
  console.log(`Listening for requests.`)
);