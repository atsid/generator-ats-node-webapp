const log = require('debug')('app:startup');
const promises = [];

module.exports = {
  addHook(hook) {
    log('adding startup hook');
    promises.push(hook);
  },

  resolve() {
    log(`resolving ${promises.length} startup hooks`);
    return Promise.all(promises);
  },
};
