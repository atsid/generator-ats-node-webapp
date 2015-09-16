const jefferson = require('express-jefferson');
const passport = require('passport');
const redirect = require('app/middleware/redirect');

module.exports = jefferson.router({
  routes: {
    '/': {
      get: [passport.authenticate('twitter')],
    },
    '/callback': {
      get: [
        passport.authenticate('twitter', {failureRedirect: '/#/login'}),
        redirect('/'),
      ],
    },
  },
});
