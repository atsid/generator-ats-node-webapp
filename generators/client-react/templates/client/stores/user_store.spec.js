require('../common.spec/spec.helpers');
const { expect } = require('chai');
const UserStore = require('./user_store');
const nock = require('nock');

describe('The User Store', () => {
  beforeEach(function beforeEach() {
    this.store = new UserStore();
  });

  it('can be constructed', function test() {
    expect(this.store).to.be.an.object;
  });

  it('can retrieve the current user', function test() {
    nock('http://localhost').get('/api/auth/current').reply(200, { 'name': 'Bob Tester'});

    return this.store.getCurrentUser().then((user) => {
      expect(user).to.be.an.object;
      expect(user.name).to.equal('Bob Tester');
    });
  });

  it('emits null when the user cannot be found', function test() {
    nock('http://localhost').get('/api/auth/current').reply(404, { 'data': 'Test Error'});

    return this.store.getCurrentUser().then((user) => {
      expect(user).to.be.null;
    });
  });
});
