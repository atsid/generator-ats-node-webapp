const Users = require('app/persistence').repositories.Users;
const log = require('debug')('app:auth');

/**
 * The default token handler - does nothing with the provider tokens
 * @param user
 * @returns {*}
 */
function defaultHandleTokens(user) {
  return user;
}

module.exports = (findUserEntity, createUserEntity, methodName, handleTokens = defaultHandleTokens) => {
  return (tokenA, tokenB, profile, done) => {
    return Users.findOneByCriteria(findUserEntity(profile))
      .then((found) => found || Users.create(createUserEntity(profile)))
      .then((user) => handleTokens(user, tokenA, tokenB))
      .then((user) => done(null, user))
      .catch((err) => {
        log(`error authenticating via ${methodName}`, err);
        done(err, null);
      });
  };
};
