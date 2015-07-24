const {expect} = require('chai');
const _ = require('lodash');
const sampleData = require('./sample_facebook_user');
const handler = require('./oauth_callback');
const hat = require('hat');

function generateProfile() {
    return _.merge(_.clone(sampleData), {id: '' + hat()});
}

function handle(profile, done) {
    return handler(null, null, profile, done);
}

describe('Facebook OAuth Callback', () => {
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
        const onComplete = (err, user) => {
            expect(err).to.be.ok;
            expect(user).to.be.null;
        };
        return handle({id: 1}, onComplete);
    });
});
