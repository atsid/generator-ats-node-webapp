const log = require('log4js').getLogger('app:auth');
const Users = require('app/persistence').repositories.Users;

module.exports = (email, password, done) => {
  log.debug('authenticating user ' + email);
  return Promise.resolve(true)
    .then(() => Users.findByEmail(email))
    .then((user) => {
      if (!user) {
        log.debug('could not find user - ' + email);
        done(null, false);
      } else {
        return user.isValidPassword(password)
          .then((isValid) => {
            if (!isValid) {
              log.debug('password not valid for user - ' + email);
            } else {
              log.debug('authenticated user with password - ' + email);
            }
            done(null, (isValid ? user : false));
          });
      }
    })
    .catch((err) => {
      log.debug('error authenticating user', err);
      done(err);
    });
};
