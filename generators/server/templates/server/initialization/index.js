const debug = require('debug')('app:initialization');
const INIT_SECTIONS = [
    require('./sections/helmet'),
    require('./sections/force_ssl'),
    require('./sections/cache_control'),
    require('./sections/compression'),
    require('./sections/body_parsing'),
    require('./sections/static_content'),
    require('./sections/sessions'),
    require('./sections/passport'),
    require('./sections/jade'),
    require('./sections/routing'),
    require('./sections/error_handling'),
];

function configure(app) {
    INIT_SECTIONS.forEach((sec) => {
        debug('configuring ' + sec.name);
        sec.configure(app);
    });
}

module.exports = {configure};
