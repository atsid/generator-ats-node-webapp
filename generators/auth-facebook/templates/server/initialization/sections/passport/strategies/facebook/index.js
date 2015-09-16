const FacebookStrategy = require('passport-facebook').Strategy;
const config = require('config');
const oauthCallback = require('./oauth_callback');
const fbConfig = {
  clientID: config.auth.facebook.clientID,
  clientSecret: config.auth.facebook.clientSecret,
  callbackURL: config.auth.facebook.callbackUrl,
};

module.exports = new FacebookStrategy(fbConfig, oauthCallback);
