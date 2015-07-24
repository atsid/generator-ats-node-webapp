const convert = require('./convert_twitter_profile');
const commonOAuth = require('../../common_oauth_callback');
function findProfile(profile) {
    return { twitterId: '' + profile.id };
}
module.exports = commonOAuth(findProfile, convert, 'Twitter');
