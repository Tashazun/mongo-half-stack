/* eslint no-console: off */
const chaiHttp = require('chai-http');

const app = require('./lib/app');
const mongobd = require('.lib/mongodb');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/bands';


