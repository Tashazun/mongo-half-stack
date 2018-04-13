require('dotenv').config({ path: './test/.env' });
const mongo = require('../lib/mongodb');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../lib/app');

chai.use(chaiHttp);
const { assert } = chai;

describe('Bands E2E', () => {
    
    // before(() => {
    //     return mongo.then(db => {
    //         db.collection('bands').remove();
    //     });
    // });

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

  //.  after(() => mongo.client.close());
});