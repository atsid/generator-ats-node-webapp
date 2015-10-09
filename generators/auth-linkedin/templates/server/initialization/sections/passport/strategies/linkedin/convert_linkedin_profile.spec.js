const {expect} = require('chai');
const convert = require('./convert_linkedin_profile');
const profileData = require('./sample_linkedin_user.json');
const User = require('app/persistence').models.User;

describe('The LinkedIn profile converter function', () => {
  it('can convert a LinkedIn profile', () => {
    const userData = convert(profileData);
    return User.createQ(userData).then((created) => {
      expect(created).to.be.ok;
      expect(created.name).to.equal('Joe Test');
      expect(created.linkedinId).to.equal('' + profileData.id);
      expect(created.password).to.be.ok;
    });
  });
});
