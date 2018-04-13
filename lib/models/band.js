const mongo = require('../mongodb');

module.exports = {
    insert(band) {
        return mongo.then(db => {
            return db.collection('bands')
                .insertOne(band)
                .then(result => result.ops[0]);
        });   
    },  
};