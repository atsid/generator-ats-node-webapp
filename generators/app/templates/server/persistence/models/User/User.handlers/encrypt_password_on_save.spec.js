const { expect } = require('chai');
const rewire = require('rewire');
const handler = rewire('./encrypt_password_on_save');

describe('Encrypt Password On Save Handler', () => {
    it('can encrypt a password when it changes', (done) => {
        const user = {
            password: 'abc123',
            isModified: (field) => field === 'password',
        };
        const next = () => {
            expect(user.password).to.not.equal('abc123');
            done();
        };
        return handler.apply(user, [next]);
    });

    it('will invoke next() if the password did not change', (done) => {
        const user = {
            password: 'abc123',
            isModified: () => false,
        };
        const next = () => {
            expect(user.password).to.equal('abc123');
            done();
        };
        return handler.apply(user, [next]);
    });

    it('will invoke the catch handler when an error is thrown', (done) => {
        const user = {
            password: 'abc123',
            isModified: () => true,
        };
        handler.__with__({
            'passwordChecker': {
                encryptPassword: () => {
                    throw new Error('Triggering a blowup');
                },
            },
        })(() => {
            const next = (err) => {
                expect(err).to.be.ok;
                done();
            };
            return handler.apply(user, [next]);
        });
    });
});
