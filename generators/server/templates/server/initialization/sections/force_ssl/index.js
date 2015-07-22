const middleware = require('./force_ssl');

module.exports = {
    name: 'ssl redirection',
    configure(app) {
        app.use(middleware);
    },
};
