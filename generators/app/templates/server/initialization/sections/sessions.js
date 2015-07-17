const config = require('config');
const session = require('cookie-session');
const cookieParser = require('cookie-parser');

module.exports = {
    name: 'cookie-based sessions',
    configure(app) {
        app.use(cookieParser());
        app.use(session(config.session));
    },
};
