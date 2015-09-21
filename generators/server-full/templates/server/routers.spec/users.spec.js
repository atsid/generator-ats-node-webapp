const {expect} = require('chai');
const request = require('supertest');
const app = require('../server');

describe('/users', () => {
  beforeEach(() => require('../startup_hooks').resolve());

  it('GET will emit the user index', (done) => {
    request(app)
      .get('/api/users')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res.body.options).to.be.ok;
        expect(res.body.links).to.be.ok;
        done();
      });
  });

  it('POST will create a new user', (done) => {
    request(app)
      .post('/api/users')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send({email: 'joe.newuser@gmail.com', password: 'funky_business'})
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res.body.email).to.equal('joe.newuser@gmail.com');
        expect(res.body.password).to.be.undefined;

        request(app)
          .post('/api/auth/local')
          .send({email: 'joe.newuser@gmail.com', password: 'funky_business'})
          .expect(200, done);
      });
  });
});
