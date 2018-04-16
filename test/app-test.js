require('dotenv').config({ path: './test/.env' });
const mongo = require('../lib/mongodb');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../lib/app');

chai.use(chaiHttp);
const { assert } = chai;

describe('Bands E2E', () => {
    
    // before(() => {
    //     console.log('fuck');
    //     return mongo.then(db => {
    //         return db.collection('bands').remove();
    //     })
    //         .catch(err => {
    //             console.log(err);
    //             throw err;
    //         });
    // });

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


    it('saves a band to bands collection', () => {
        return chai.request(app)
            .post('/bands')
            .send(testBand)
            .then(({ body }) => {
                assert.ok(body._id);
                assert.equal(body.name, testBand.name);
                testBand = body;
            });
    });

    it('gets a band by id', () => {
        return chai.request(app)
            .get(`/bands/${testBand._id}`)
            .then(({ body }) => {
                assert.deepEqual(body, [testBand]);
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

    it('updates band by id', () => {
        testBand2.genre = 'Alternative Rock';

        return chai.request(app)
            .put(`bands/${testBand2._id}`)
            .send(testBand2)
            .then(({ body }) => {
                testBand2 = body;
                return chai.request(app)
                    .get(`/bands/${testBand2._id}`);
            })
            .then(({ body }) => {
                assert.deepEqual(body, [testBand2]);
            });
    });

    //after(() => mongo.client.close());
});