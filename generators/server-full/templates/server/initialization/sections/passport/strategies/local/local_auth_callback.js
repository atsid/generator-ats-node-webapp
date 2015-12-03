const log = require('debug')('app:auth');
const Users = require('app/persistence').repositories.Users;

module.exports = (email, password, done) => {
  log('authenticating user ' + email);
  return Promise.resolve(true)
    .then(() => Users.findByEmail(email))
    .then((user) => {
      if (!user) {
        log('could not find user - ' + email);
        done(null, false);
      } else {
        return user.isValidPassword(password)
          .then((isValid) => {
            if (!isValid) {
              log('password not valid for user - ' + email);
            } else {
              log('authenticated user with password - ' + email);
            }
            done(null, (isValid ? user : false));
          });
      }
    })
    .catch((err) => {
      log('error authenticating user', err);
      done(err);
    });
};
