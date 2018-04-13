
const MongoClient = require('mongodb').MongoClient;

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/bands';

const promise = MongoClient.connect(MONGO_URI);

const dbpromise = promise.then(client => {
    dbpromise.client = client;
    return client.db();
});