const User = require('app/persistence').models.User;
const debug = require('debug')('app:auth');

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
    return User.findOneQ(findUserEntity(profile))
      .then((found) => found || User.createQ(createUserEntity(profile)))
      .then((user) => handleTokens(user, tokenA, tokenB))
      .then((user) => done(null, user))
      .catch((err) => {
        debug(`error authenticating via ${methodName}`, err);
        done(err, null);
      });
  };
};
