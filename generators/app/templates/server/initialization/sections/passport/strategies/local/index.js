const LocalStrategy = require('passport-local').Strategy;
const localCallback = require('./local_auth_callback');
const localConfig = {
    usernameField: 'email',
    passwordField: 'password',
};
module.exports = new LocalStrategy(localConfig, localCallback);
