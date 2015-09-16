const config = require('config');
const jefferson = require('express-jefferson');
const passport = require('passport');
const redirect = require('app/middleware/redirect');

module.exports = jefferson.router({
  routes: {
    '/': {
      get: [passport.authenticate('google', {scope: config.auth.google.scope})],
    },
    '/callback': {
      get: [
        passport.authenticate('google', {failureRedirect: '/#/login'}),
        redirect('/'),
      ],
    },
  },
});
