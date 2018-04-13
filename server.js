/* eslint no-console: off */
const http = require('http');

const app = require('./lib/app');
const mongodb = require('.lib/mongodb');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/bands';

mongodb.connect(MONGODB_URI)
    .then(() => console.log('Connected to Bands Collection'))
    .catch(err => console.log('FAILED!!', err));

const server = http.createServer(app);
const PORT = process.env.MONGODB_URI;

server.listen(PORT, () => {
    console.log('Listening to PORT');
});