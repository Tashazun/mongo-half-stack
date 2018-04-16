const mongo = require('../mongodb');
const { ObjectId } = require('mongodb');

module.exports = {
    findOne(id) {
        
        return mongo.then(db => {
            return db.collection('bands')
                .find(ObjectId(id))
                .toArray();
        });
    },

    findAll() {
        return mongo.then(db => {
            return db.collection('bands')
                .find()
                .toArray();
        });
    },

    insert(band) {
        return mongo.then(db => {
            return db.collection('bands')
                .insert(band)
                .then(result => result.ops[0]);
        });
    },

    update(band) {
        const obj = { _id : ObjectId(band._id) };
        delete band._id;
        return mongo.then(db => {
            return db.collection('bands')
                .update(obj, band);
        });
    },

    delete(id) {
        const obj = { _id : ObjectId(id) };
        return mongo.then(db => {
            return db.collection('bands')
                .remove(obj);
        });
    },

};