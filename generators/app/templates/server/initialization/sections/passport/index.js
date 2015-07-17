const passport = require('passport');
const localStrategy = require('./strategies/local');
const facebookStrategy = require('./strategies/facebook');
const twitterStrategy = require('./strategies/twitter');
const persistence = require('app/persistence');
const User = persistence.models.User;

module.exports = {
    name: 'passport',
    configure(app) {
        passport.use(localStrategy);
        passport.use(facebookStrategy);
        passport.use(twitterStrategy);
        passport.serializeUser((user, done) => done(null, user.id));
        passport.deserializeUser((id, done) => User.findById(id, (err, user) => done(err, user)));
        app.use(passport.initialize());
        app.use(passport.session());
    },
};
