const convert = require('./convert_linkedin_profile');
const commonOAuth = require('../../common_oauth_callback');
function findProfile(profile) {
  return {linkedinId: '' + profile.id};
}
module.exports = commonOAuth(findProfile, convert, 'LinkedIn');
