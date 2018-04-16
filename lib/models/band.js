const mongo = require('../mongodb');
const { ObjectId } = require('mongodb');

module.exports = {
    insert(band) {
        return mongo.then(db => {
            return db.collection('bands')
                .insertOne(band)
                .then(result => result.ops[0]);
        });   
    },

    selectOne(band) {
        return mongo.then(db => {
            return db.collection('bands')
                .find(ObjectId(band))
                .toArray();
        });   
    },

    selectAll() {
        return mongo.then(db => {
            return db.collection('bands')
                .find()
                .toArray();
        });
    },

    update(band) {
        return mongo.then(db => {
            return db.collection('bands')
                .update({ _id: ObjectId(band) });
        });
    }
};