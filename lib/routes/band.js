const notFound = require('./notFound');
const band = require('../models/band');

const post = (req, res) => {
    band.insert(req.body).then(saved => {
        res.send(saved);
    });
};

const methods = { post };

module.exports = (req, res) => {
    const method = methods[req.method.toLowerCase()] || notFound;
    method(req, res);
};