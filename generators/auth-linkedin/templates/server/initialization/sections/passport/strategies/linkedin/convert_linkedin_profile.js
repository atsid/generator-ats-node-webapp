const hat = require('hat');

/**
 * A function that converts a linkedin profile into a persistable user object
 * @param profile
 * @returns {{linkedinId: string, name: *, password: *}}
 */
module.exports = (profile) => {
  return {
    linkedinId: '' + profile.id,
    name: profile.displayName,
    password: hat(),
  };
};
