const config = require('config');
const fs = require('fs');
const path = require('path');
const seeder = require('./seed');
const startupHooks = require('../startup_hooks');

const mongoose = require('./mongoose');
const debug = require('debug')('app:persistence');
const models = {};

/**
 * Dynamically load model types
 */
function getModels() {
  const modelNames = fs.readdirSync(path.join(__dirname, 'models'));

  function loadModel(modelName) {
    debug(`loading model ${modelName}`);
    const modelFunction = require(`./models/${modelName}`);
    debug(`preparing model ${modelName}`);
    models[modelName] = modelFunction(mongoose);
  }

  modelNames.forEach(loadModel);
}

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

debug('Initializing Persistence');
getModels();
populateSeed();

module.exports = {models};
