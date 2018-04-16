const notFound = require('./notFound');
const band = require('../models/band');

const get = (req, res) => {
    const id = req.paths[1];
    id ? getOne(id, req, res) : getAll(req, res);
};

const getOne = (id, req, res) => {
    band.findOne(id)
        .then(band => {
            res.send(band);
        });
};

const getAll = (req, res) => {
    band.findAll().then(miniHorses => {
        res.send(miniHorses);
    });
};

const post = (req, res) => {
    band.insert(req.body).then(band => {
        res.send(band);
    });
};

const put = (req, res) => {
    band.update(req.body).then(updated => {
        res.send(updated);
    });
};

const del = (req, res) => {
    band.delete(req.paths[1]).then(() =>
        res.send({ removed: true }));
};

const methods = { get, post, put, delete: del };


module.exports = (req, res) => {
    const method = methods[req.method.toLowerCase()] || notFound;
    method(req, res);
};