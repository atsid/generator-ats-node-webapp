const passport = require('passport');
const Users = require('app/persistence').repositories.Users;
const fs = require('fs');
const path = require('path');

module.exports = {
  name: 'passport',
  configure(app) {
    fs.readdirSync(path.join(__dirname, 'strategies')).forEach((strategyName) => {
      const strategy = require(`./strategies/${strategyName}`);
      passport.use(strategy);
    });
    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser((id, done) => {
      Users.findById(id)
        .then((user) => done(null, user))
        .catch((err) => done(err));
    });
    app.use(passport.initialize());
    app.use(passport.session());
  },
};
