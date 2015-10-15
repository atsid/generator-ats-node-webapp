const config = require('config');
const seeder = require('./seed');
const startupHooks = require('../startup_hooks');
const debug = require('debug')('app:persistence');
const models = require('./models');
const repoIndex = require('./repositories');

/**
 * Populate seed data
 * @returns {*}
 */
function populateSeed() {
  if (config.database.populateSeedData) {
    debug('loading seed data');
    const seedingPromise = seeder.seedData(models);
    startupHooks.addHook(seedingPromise);
  }
}

populateSeed();
const repositories = repoIndex.initialize(models);
module.exports = {models, repositories};
