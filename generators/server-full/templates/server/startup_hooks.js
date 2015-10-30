const Bluebird = require('bluebird');
const log = require('log4js').getLogger('app:startup');
const promises = [];

module.exports = {
  addHook(hook) {
    log.debug('adding startup hook');
    promises.push(hook);
  },

  resolve() {
    log.debug(`resolving ${promises.length} startup hooks`);
    return Bluebird.all(promises);
  },
};
