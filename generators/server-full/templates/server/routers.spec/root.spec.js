const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');
const app = require('../server');

describe('/api', () => {
  it('is emits a root data payload', (done) => {
    request(app)
      .get('/api')
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res.body.status).to.equal('ok');
        done();
      });
  });
});
