const Bluebird = require('bluebird');
const debug = require('debug')('app:startup');
const promises = [];

module.exports = {
  addHook(hook) {
    debug('adding startup hook');
    promises.push(hook);
  },

  resolve() {
    debug(`resolving ${promises.length} startup hooks`);
    return Bluebird.all(promises);
  },
};
