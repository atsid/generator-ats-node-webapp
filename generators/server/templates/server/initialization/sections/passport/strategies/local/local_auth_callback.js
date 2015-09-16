const debug = require('debug')('app:auth');
const persistence = require('app/persistence');
const User = persistence.models.User;
const Bluebird = require('bluebird');

module.exports = (email, password, done) => {
  debug('authenticating user ' + email);
  return Bluebird.resolve(true)
    .then(() => User.findOneQ({email: email}))
    .then((user) => {
      if (!user) {
        debug('could not find user -' + email);
        done(null, false);
      } else {
        return user.isValidPassword(password)
          .then((isValid) => {
            if (!isValid) {
              debug('password not valid for user -' + email);
            } else {
              debug('authenticated user with password - ' + email);
            }
            done(null, (isValid ? user : false));
          });
      }
    })
    .catch((err) => {
      debug('error authenticating user', err);
      done(err);
    });
};
