const express = require('express');
const mongodb = require('mongodb');

const db = require('./data/db');

var port = process.env.PORT || 3000;
var app = express();

app.get('/', (req, res) => {
  res.status(200).send(db);
});

app.listen(port, () => {
  console.log(`Server now listening on port ${port}`);
});