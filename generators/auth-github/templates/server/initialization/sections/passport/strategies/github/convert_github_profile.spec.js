const {expect} = require('chai');
const convert = require('./convert_github_profile');
const profileData = require('./sample_github_user.json');
const User = require('app/persistence').models.User;

describe('The github profile converter function', () => {
    it('can convert a github profile', () => {
        const userData = convert(profileData);
        return User.createQ(userData).then((created) => {
            expect(created).to.be.ok;
            expect(created.name).to.equal('Joe Test');
            expect(created.githubId).to.equal('' + profileData.id);
            expect(created.password).to.be.ok;
        });
    });
});
