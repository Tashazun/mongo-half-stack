const notFound = require('./notFound');
const band = require('../models/band');

const post = (req, res) => {
    band.insert(req.body).then(saved => {
        res.send(saved);
    });
};

const get = (req, res) => {
    const id = req.paths[1];
    id ? getOne(id, req, res) : getAll(req, res);
};

const getOne = (id, req, res) => {
    band.selectOne(id).then(one => {
        res.send(one);
    });
};

const getAll = (req, res) => {
    band.selectAll().then(bands => {
        res.send(bands);
    });
};

const put = (id, req, res) => {
    band.update(req.body).then(updated => {
        res.send(updated);
    });
};

const methods = { get, post, put };

module.exports = (req, res) => {
    const method = methods[req.method.toLowerCase()] || notFound;
    method(req, res);
};