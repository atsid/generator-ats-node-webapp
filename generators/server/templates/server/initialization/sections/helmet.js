const helmet = require('helmet');

module.exports = {
    name: 'helmet hardening',
    configure(app) {
        app.use(helmet());
    },
};
