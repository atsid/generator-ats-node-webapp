const {expect} = require('chai');
const convert = require('./convert_google_profile');
const profileData = require('./sample_google_user.json');
const User = require('app/persistence').models.User;

describe('The Google profile converter function', () => {
    it('can convert a Googleprofile', () => {
        const userData = convert(profileData);
        return User.createQ(userData).then((created) => {
            expect(created).to.be.ok;
            expect(created.name).to.equal('Joe Test');
            expect(created.googleId).to.equal('' + profileData.id);
            expect(created.password).to.be.ok;
        });
    });
});
