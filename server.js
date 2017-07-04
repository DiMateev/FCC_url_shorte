const express = require('express');

var port = process.env.PORT || 3000;
var app = express();

app.use(express.static('/public'));

app.get('/', (req, res) => {
  res.send('Server is up!');
});

app.listen(port, () => {
  console.log(`Server now listening on port ${port}`);
});