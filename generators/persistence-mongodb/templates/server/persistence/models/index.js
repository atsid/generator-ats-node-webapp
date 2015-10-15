const fs = require('fs');
const debug = require('debug')('app:persistence:models');
const models = {};
const mongoose = require('../mongoose');

/**
 * Dynamically load model types
 */
function getModels() {
  const modelNames = fs.readdirSync(__dirname);

  function loadModel(modelName) {
    if (modelName !== 'index.js') {
      debug(`loading model ${modelName}`);
      const modelFunction = require(`./${modelName}`);
      debug(`preparing model ${modelName}`);
      models[modelName] = modelFunction(mongoose);
    }
  }

  modelNames.forEach(loadModel);
}

getModels();

module.exports = models;
