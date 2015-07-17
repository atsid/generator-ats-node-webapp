const {expect} = require('chai');
const convert = require('./convert_facebook_profile');
const profileData = require('./sample_facebook_user.json');
const User = require('app/persistence').models.User;

describe('The Facebook profile converter function', () => {
    it('can convert a Facebook profile', () => {
        const userData = convert(profileData);
        return User.createQ(userData).then((created) => {
            expect(created).to.be.ok;
            expect(created.name).to.equal('Joe Test');
            expect(created.facebookId).to.equal('' + profileData.id);
            expect(created.password).to.be.ok;
        });
    });
});
