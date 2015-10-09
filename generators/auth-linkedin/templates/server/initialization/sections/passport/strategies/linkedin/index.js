const config = require('config');
const Strategy = require('passport-linkedin').Strategy;
const oauthCallback = require('./oauth_callback');
const stategyConfig = {
  consumerKey: config.auth.linkedin.clientID,
  consumerSecret: config.auth.linkedin.clientSecret,
  callbackURL: config.auth.linkedin.callbackURL,
};
module.exports = new Strategy(stategyConfig, oauthCallback);
