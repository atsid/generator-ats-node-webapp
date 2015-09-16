const {expect} = require('chai');
const _ = require('lodash');
const sampleData = require('./sample_github_user');
const handler = require('./oauth_callback');
const hat = require('hat');
function generateProfile() {
  const data = _.clone(sampleData);
  data.id = '' + hat();
  return data;
}

function handle(profile, done) {
  return handler(null, null, profile, done);
}

describe('Github OAuth Callback', () => {
  describe('profile handling', () => {
    it('can create an account for a user', () => {
      let userId = null;
      const onComplete = (err, user) => {
        userId = user.id;
        expect(err).to.be.null;
        expect(user.id).to.be.ok;
      };

      const secondComplete = (err, user) => {
        expect(err).to.be.null;
        expect(user.id).to.equal(userId);
      };

      const profile = generateProfile();
      return handle(profile, onComplete)
        .then(() => handle(profile, secondComplete));
    });
  });

  it('can handle an error', () => {
    function onComplete(err, user) {
      expect(err).to.be.ok;
      expect(user).to.be.null;
    }
    return handle({id: 1}, onComplete);
  });
});
