const jefferson = require('express-jefferson');
const passport = require('passport');
const auth = require('app/middleware/auth');

module.exports = jefferson.router({
  routes: {
    '/': {
      post: [
        passport.authenticate('local'),
        auth.getCurrentUser,
      ],
    },
  },
});
