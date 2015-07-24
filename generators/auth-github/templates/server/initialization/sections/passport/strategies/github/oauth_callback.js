const convert = require('./convert_github_profile');
const commonOAuth = require('../../common_oauth_callback');
function findProfile(profile) {
    return { githubId: '' + profile.id };
}
module.exports = commonOAuth(findProfile, convert, 'Github');
