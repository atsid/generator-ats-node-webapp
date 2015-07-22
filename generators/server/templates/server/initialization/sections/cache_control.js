const cacheResponseDirective = require('express-cache-response-directive');
module.exports = {
    name: 'cache control',
    configure(app) {
        app.use(cacheResponseDirective());
    },
};
