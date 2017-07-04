const {MongoClient} = require('mongodb');
const url = process.env.MONGO_URI || 'mongodb://localhost:27017/url-shorte';

var db = MongoClient.connect(url, (err, db) => {
  if (err) {
    return console.log('Errorrrr:', err);
  }
  console.log('Connected to the database');
  return db;
});

module.exports = {db};