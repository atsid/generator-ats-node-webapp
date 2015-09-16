const hat = require('hat');

/**
 * A function that converts a google profile into a persistable user object
 * @param profile
 * @returns {{googleId: string, name: *, password: *}}
 */
module.exports = (profile) => {
  return {
    googleId: '' + profile.id,
    name: profile.displayName,
    password: hat(),
  };
};
