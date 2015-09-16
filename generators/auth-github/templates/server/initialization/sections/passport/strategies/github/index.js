const config = require('config');
const Strategy = require('passport-github2').Strategy;
const oauthCallback = require('./oauth_callback');
const stategyConfig = {
  clientID: config.auth.github.clientID,
  clientSecret: config.auth.github.clientSecret,
  callbackURL: config.auth.github.callbackURL,
};
module.exports = new Strategy(stategyConfig, oauthCallback);
