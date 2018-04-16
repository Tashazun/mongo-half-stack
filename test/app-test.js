require('dotenv').config({ path: './test/.env' });
const mongo = require('../lib/mongodb');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../lib/app');

chai.use(chaiHttp);
const { assert } = chai;

describe('Bands E2E', () => {
    
    before(() => {
        return mongo.then(db => {
            db.dropCollection('bands');
        });
    });

    let testBand = {
        name: 'Bat for Lashes',
        genre: 'Dreampop',
        singer: 'Natasha Khan'
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

    it ('gets all bands', () => {
        return chai.request(app)
            .get('/bands')
            .then(({ body }) => {
                assert.deepEqual(body, [testBand]);
            });
    });

    // after(() => mongo.client.close());
});