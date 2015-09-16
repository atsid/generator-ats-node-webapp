const hat = require('hat');

/**
 * A function that converts a twitter profile into a persistable user object
 * @param profile
 * @returns {{twitterId: string, name: *, password: *}}
 */
module.exports = (profile) => {
  return {
    twitterId: '' + profile.id,
    name: profile.name,
    password: hat(),
  };
};
