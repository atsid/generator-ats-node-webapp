const config = require('config');
const seeder = require('./seed');
const startupHooks = require('../startup_hooks');
const debug = require('debug')('app:persistence');
const models = require('./models');
const repoIndex = require('./repositories');
const sequelize = require('./sequelize');

const repositories = repoIndex.initialize(models);

/**
 * Populate seed data
 * @returns {*}
 */
function populateSeed() {
  if (config.database.populateSeedData) {
    debug('loading seed data');
    const seedingPromise = seeder.seedData(repositories);
    startupHooks.addHook(seedingPromise);
  }
}

// Initialize Persistence
sequelize.sync().then(populateSeed);

module.exports = {models, repositories};
