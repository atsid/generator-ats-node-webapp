const fs = require('fs');
const path = require('path');
const debug = require('debug')('app:persistence:models');

const models = {};
fs.readdirSync(__dirname)
  .map((name) => (name.indexOf('.js') > 0 ? path.basename(name, '.js') : name))
  .filter((name) => name !== 'index')
  .map((name) => {
    debug(`initializing model ${name}`);
    const Model = require(`./${path.basename(name, '.js')}`);
    models[name] = Model;
  });

module.exports = models;
