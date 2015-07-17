const errorHandler = require('./error_handler');

module.exports = {
    name: 'error handler',
    configure(app) {
        app.use(errorHandler);
    },
};
