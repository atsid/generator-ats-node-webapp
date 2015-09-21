const passport = require('passport');
const persistence = require('app/persistence');
const User = persistence.models.User;
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
    passport.deserializeUser((id, done) => User.findById(id, (err, user) => done(err, user)));
    app.use(passport.initialize());
    app.use(passport.session());
  },
};
