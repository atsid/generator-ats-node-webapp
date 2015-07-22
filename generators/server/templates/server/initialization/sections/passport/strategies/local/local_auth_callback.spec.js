const {expect} = require('chai');
const rewire = require('rewire');
const callback = rewire('./local_auth_callback');

describe('local authentication callback', () => {
    beforeEach(() => require('app/startup_hooks').resolve());

    it('can authenticate a user with email and password', () => {
        const onComplete = (err, user) => {
            expect(err).to.be.null;
            expect(user.email).to.equal('test@atsid.com');
        };
        return callback('test@atsid.com', 'abc123', onComplete);
    });

    it('will reject a user with a bad password', () => {
        const onComplete = (err, user) => {
            expect(err).to.be.null;
            expect(user).to.be.false;
        };
        return callback('test@atsid.com', 'bad_password', onComplete);
    });

    it('will reject a user who is not in the system', () => {
        const onComplete = (err, user) => {
            expect(err).to.be.null;
            expect(user).to.be.false;
        };
        return callback('non.user@bogus.com', 'bad_password', onComplete);
    });

    it('will invoke done with an error in case of an error', (done) => {
        callback.__with__({
            'User': {
                findOneQ: () => {
                    throw new Error('throwing intentional error');
                },
            },
        })(() => {
            const onComplete = (err) => {
                expect(err).to.be.ok;
                done();
            };
            callback('herp@derp.com', 'abc123', onComplete);
        });
    });
});
