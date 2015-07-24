const convert = require('./convert_google_profile');
const commonOAuth = require('../../common_oauth_callback');
function findProfile(profile) {
    return { googleId: '' + profile.id };
}
module.exports = commonOAuth(findProfile, convert, 'Google');
