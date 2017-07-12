const express = require('express');
const bodyParser = require('body-parser');
const isURL = require('is-url');
const {MongoClient} = require('mongodb');

const {createShortLink} = require('./utils/app');

var app = express();
const port = process.env.PORT || 3000;
const dbAddress = process.env.MONGODB_URI || 'mongodb://localhost:27017/url-shorte';

app.use(express.static('public/'));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/new/:url*', async (req, res) => {
  const url = req.params.url + req.params[0];
  if (!isURL(url)) {
    return res.send({error: 'Provided url is not valid. Please try again.'});
  }
  try {
    const urlsObj = await createShortLink(req.headers.host, url);
    res.send(urlsObj);
  } catch (e) {
    res.status(400).send(e);
  }
});

app.get('/:id', async (req, res) => {
  let shortUrl = `${req.protocol}://${req.headers.host}/${req.params.id}`;
  MongoClient.connect(dbAddress, async (err, db) => {
    if (err) throw new Error();
    const urls = db.collection('urls');
    var url = await urls.findOne({short_url: shortUrl});
    if (url) {
      res.redirect(url.original_url);
    } else {
      res.send({error: `${shortUrl} does NOT exist in our database!`})
    }    
  });
});

app.listen(port, () => {
  console.log(`Server now listening on port ${port}`);
});