const mongo = require('../lib/mongodb');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../lib/app');

chai.use(chaiHttp);
const { assert } = chai;


describe('E2E bands', () => {

    before(() => {
        return mongo.then(db => {
            return db.dropCollection('bands')
                .catch(err => {
                    if(err.codeName !== 'NamespaceNotFound') {
                        throw err;
                    }
                });
        });
    });

    let testBand = {
        name: 'Bat for Lashes',
        genre: 'Dreampop',
        singer: 'Natasha Khan'
    };

    let testBand2 = {
        name: 'Muse',
        genre: 'Alt Rock',
        singer: 'Matt Bellamy'
    };

    it('saves a band', () => {
        return chai.request(app)
            .post('/bands')
            .send(testBand)
            .then(({ body }) => {
                assert.ok(body._id);
                assert.equal(body.name, testBand.name);
                testBand = body;
            });
    });

    it('gets all bands', () => {
        return chai.request(app)
            .post('/bands')
            .send(testBand2)
            .then(({ body }) => {
                testBand2 = body;
                return chai.request(app)
                    .get('/bands');
            })
            .then(({ body }) => {
                assert.deepEqual(body, [testBand, testBand2]);
            });
    });

    it('find band by id', () => {
        return chai.request(app)
            .get(`/bands/${testBand._id}`)
            .then(({ body }) => {
                assert.deepEqual(body, [testBand]);
            });
    });

    it('updates band', () => {
        testBand2.genre = 'Alernative Rock';

        return chai.request(app)
            .put(`/bands/${testBand2._id}`)
            .send(testBand2)
            .then(() => {
                return chai.request(app)
                    .get(`/bands/${testBand2._id}`);
            })
            .then(({ body }) => {
                assert.deepEqual(body, [testBand2]);
            });
    });

    it('deletes a band', () => {
        return chai.request(app)
            .del(`/bands/${testBand2._id}`)
            .then(() => {
                return chai.request(app)
                    .get('/bands');
            })
            .then(({ body }) => {
                assert.deepEqual(body, [testBand]);
            });
    });


    after(() => mongo.client.close());
});