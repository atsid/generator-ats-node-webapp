const User = require('app/persistence').models.User;
const debug = require('debug')('app:auth');

module.exports = (findUserEntity, createUserEntity, methodName) => {
    return (tokenA, tokenB, profile, done) => {
        return User.findOneQ(findUserEntity(profile))
            .then((found) => found || User.createQ(createUserEntity(profile)))
            .then((user) => done(null, user))
            .catch((err) => {
                debug(`error authenticating via ${methodName}`, err);
                done(err, null);
            });
    };
};
