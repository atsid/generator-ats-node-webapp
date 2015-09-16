const jefferson = require('express-jefferson');
const passport = require('passport');
const redirect = require('app/middleware/redirect');

module.exports = jefferson.router({
  routes: {
    '/': {
      get: [passport.authenticate('facebook')],
    },
    '/callback': {
      get: [
        passport.authenticate('facebook', {failureRedirect: '/#/login'}),
        redirect('/'),
      ],
    },
  },
});
