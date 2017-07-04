const express = require('express');
const mongodb = require('mongodb');

const db = require('./data/db');

var port = process.env.PORT || 3000;
var app = express();

app.use(express.static('/public'));

app.get('/', (req, res) => {
  res.send(db.find().toString());
});

app.listen(port, () => {
  console.log(`Server now listening on port ${port}`);
});