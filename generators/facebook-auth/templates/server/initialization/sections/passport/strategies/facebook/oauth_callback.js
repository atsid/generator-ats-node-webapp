const convert = require('./convert_facebook_profile');
const commonOAuth = require('../../common_oauth_callback');
const findProfile = (profile) => {
    return { facebookId: '' + profile.id };
};
module.exports = commonOAuth(findProfile, convert, 'Twitter');
