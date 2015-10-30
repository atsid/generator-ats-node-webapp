const {expect} = require('chai');
const convert = require('./convert_linkedin_profile');
const profileData = require('./sample_linkedin_user.json');
const Users = require('app/persistence').repositories.Users;

describe('The LinkedIn profile converter function', () => {
  it('can convert a LinkedIn profile', () => {
    const userData = convert(profileData);
    return Users.create(userData).then((created) => {
      expect(created).to.be.ok;
      expect(created.name).to.equal('Joe Test');
      expect(created.linkedinId).to.equal('' + profileData.id);
      expect(created.password).to.be.ok;
    });
  });
});
