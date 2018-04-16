const mongo = require('../mongodb');
const { ObjectId } = require('mongodb');

module.exports = {
    insert(band) {
        return mongo.then(db => {
            return db.collection('bands-test')
                .insertOne(band)
                .then(result => result.ops[0]);
        });   
    },

    selectOne(band) {
        return mongo.then(db => {
            return db.collection('bands-test')
                .findOne(ObjectId(band))
                .toArray();
        });   
    },

    selectAll() {
        return mongo.then(db => {
            return db.collection('bands-test')
                .findAll()
                .toArray();
        });
    }
};