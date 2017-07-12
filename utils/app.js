const {MongoClient} = require('mongodb');

const dbAddress = process.env.MONGODB_URI || 'mongodb://localhost:27017/url-shorte';


const generateNumber = () => {
  return Math.floor(Math.random() * 9000 + 1000);
}

const createShortLink = async (host, url) => {
  const obj = {
    original_url: url,
    short_url: `${host}/${generateNumber()}`
  };
  try {
    await saveToMongo(obj);
    return obj;
  } catch (e) {
    throw new Error();
  }
}

const saveToMongo = (obj) => {
  MongoClient.connect(dbAddress, (err, db) => {
    if (err) throw new Error();
    const urls = db.collection('urls');
    urls.findOne({short_url: obj.short_url}).then((url) => {
      if (!url) {
        urls.insertOne(obj);
      } else {
        urls.findOneAndUpdate({
          short_url: obj.short_url
        }, {$set: {
          original_url: obj.original_url
        }});
      }
    });
  });
}

module.exports= {createShortLink};