const hat = require('hat');

/**
 * A function that converts a linkedin profile into a persistable user object
 * @param profile
 * @returns {{githubId: string, name: *, password: *}}
 */
module.exports = (profile) => {
  return {
    linkedin: '' + profile.id,
    name: profile['first-name'] + ' ' + profile['last-name'],
    password: hat(),
  };
};
