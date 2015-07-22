const mountie = require('express-mountie');
const jefferson = require('express-jefferson');
const path = require('path');
const auth = require('app/middleware/auth');

const router = jefferson.router({
    routes: {
        '/': {
            get: [auth.index],
        },
        '/current': {
            get: [auth.getCurrentUser],
            'delete': [auth.logout],
        },
    },
});

mountie({
    parent: router,
    src: path.join(__dirname, 'methods'),
    prefix: (name) => `/${name}`,
});

module.exports = router;
