const config = require('config');
const TwitterStrategy = require('passport-twitter').Strategy;
const oauthCallback = require('./oauth_callback');
const twitterConfig = {
  consumerKey: config.auth.twitter.consumerKey,
  consumerSecret: config.auth.twitter.consumerSecret,
  callbackURL: config.auth.twitter.callbackURL,
};
module.exports = new TwitterStrategy(twitterConfig, oauthCallback);
