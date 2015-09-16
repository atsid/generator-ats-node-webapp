const hat = require('hat');

/**
 * A function that converts a github profile into a persistable user object
 * @param profile
 * @returns {{githubId: string, name: *, password: *}}
 */
module.exports = (profile) => {
  return {
    githubId: '' + profile.id,
    name: profile.displayName,
    password: hat(),
  };
};
