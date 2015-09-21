const {expect} = require('chai');
const checker = require('./password_checker');

describe('The password checker component', () => {
  describe('password encryption method', () => {
    it('can encrypt a password', () => {
      const input = 'derp';
      return checker.encryptPassword(input)
        .then(encrypted => expect(encrypted).to.not.equal(input));
    });

    it('throws an error if the password is undefined', () => {
      expect(() => checker.encryptPassword()).to.throw();
    });
  });

  describe('password checking method', () => {
    it('throws an error if the test password is undefined', () => {
      expect(() => checker.isValidPassword(null, 'some_hash')).to.throw();
    });

    it('throws an error if the hash is undefined', () => {
      expect(() => checker.isValidPassword('some_password')).to.throw();
    });

    it('can determine if an input password matches an encrypted password', () => {
      const existingPasswordPlain = 'youshallnotpass';
      return checker.encryptPassword(existingPasswordPlain)
        .then(encryptedPassword => checker.isValidPassword(existingPasswordPlain, encryptedPassword))
        .then(isMatch => expect(isMatch).to.be.true);
    });

    it('can determine if an input password does not match an encrypted password', () => {
      const existingPasswordPlain = 'youshallnotpass';
      return checker.encryptPassword(existingPasswordPlain)
        .then(encryptedPassword => checker.isValidPassword('derp derp', encryptedPassword))
        .then(isMatch => expect(isMatch).to.be.false);
    });
  });
});
