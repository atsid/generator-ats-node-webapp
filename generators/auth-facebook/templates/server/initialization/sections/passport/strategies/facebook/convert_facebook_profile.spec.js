const {expect} = require('chai');
const convert = require('./convert_facebook_profile');
const profileData = require('./sample_facebook_user.json');
const Users = require('app/persistence').repositories.Users;

describe('The Facebook profile converter function', () => {
  it('can convert a Facebook profile', () => {
    const userData = convert(profileData);
    return Users.create(userData).then((created) => {
      expect(created).to.be.ok;
      expect(created.name).to.equal('Joe Test');
      expect(created.facebookId).to.equal('' + profileData.id);
      expect(created.password).to.be.ok;
    });
  });
});
