const config = require('config');
const GoogleStrategy = require('passport-google-oauth').Strategy;
const oauthCallback = require('./oauth_callback');
const googleConfig = {
    consumerKey: config.auth.google.consumerKey,
    consumerSecret: config.auth.google.consumerSecret,
    callbackURL: config.auth.google.callbackURL,
};
module.exports = new GoogleStrategy(googleConfig, oauthCallback);
