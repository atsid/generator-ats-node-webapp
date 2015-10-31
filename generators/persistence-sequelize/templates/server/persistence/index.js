const config = require('config');
const seeder = require('./seed');
const startupHooks = require('../startup_hooks');
const log = require('log4js').getLogger('app:persistence');
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
    log.debug('loading seed data');
    return seeder.seedData(repositories);
  }
}

// Initialize Persistence
startupHooks.addHook(sequelize.sync().then(populateSeed));

module.exports = {models, repositories};
