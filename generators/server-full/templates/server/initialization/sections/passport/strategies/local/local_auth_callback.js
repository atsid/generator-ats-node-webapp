const debug = require('debug')('app:auth');
const Users = require('app/persistence').repositories.Users;
const Bluebird = require('bluebird');

module.exports = (email, password, done) => {
  debug('authenticating user ' + email);
  return Bluebird.resolve(true)
    .then(() => Users.findByEmail(email))
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
