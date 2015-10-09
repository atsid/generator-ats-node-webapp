const config = require('config');
const jefferson = require('express-jefferson');
const passport = require('passport');
const redirect = require('app/middleware/redirect');

module.exports = jefferson.router({
  routes: {
    '/': {
      get: [passport.authenticate('linkedin', {scope: config.auth.linkedin.scope})],
    },
    '/callback': {
      get: [
        passport.authenticate('linkedin', {failureRedirect: '/#/login'}),
        redirect('/'),
      ],
    },
  },
});
