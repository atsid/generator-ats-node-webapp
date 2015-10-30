const config = require('config');
const seeder = require('./seed');
const startupHooks = require('../startup_hooks');
const log = require('log4js').getLogger('app:persistence');
const models = require('./models');
const repoIndex = require('./repositories');
const repositories = repoIndex.initialize(models);

/**
 * Populate seed data
 * @returns {*}
 */
function populateSeed() {
  if (config.database.populateSeedData) {
    log.debug('loading seed data');
    const seedingPromise = seeder.seedData(repositories);
    startupHooks.addHook(seedingPromise);
  }
}

populateSeed();
module.exports = {models, repositories};
