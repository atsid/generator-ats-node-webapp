const config = require('config');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const oauthCallback = require('./oauth_callback');
const googleConfig = {
  clientID: config.auth.google.clientID,
  clientSecret: config.auth.google.clientSecret,
  callbackURL: config.auth.google.callbackURL,
};
module.exports = new GoogleStrategy(googleConfig, oauthCallback);
