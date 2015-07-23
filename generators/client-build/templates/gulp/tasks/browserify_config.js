const babelify = require('babelify');
const config = require('../config');

module.exports = () => {
    return {
        entries: config.client.entries,
        transform: [babelify],
        debug: false,
        cache: {},
        packageCache: {},
    };
};
