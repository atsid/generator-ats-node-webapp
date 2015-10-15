const {expect} = require('chai');
const convert = require('./convert_google_profile');
const profileData = require('./sample_google_user.json');
const Users = require('app/persistence').repositories.Users;

describe('The Google profile converter function', () => {
  it('can convert a Google profile', () => {
    const userData = convert(profileData);
    return Users.create(userData).then((created) => {
      expect(created).to.be.ok;
      expect(created.name).to.equal('Joe Test');
      expect(created.googleId).to.equal('' + profileData.id);
      expect(created.password).to.be.ok;
    });
  });
});
