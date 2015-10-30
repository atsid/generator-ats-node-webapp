const fs = require('fs');
const path = require('path');
const log = require('log4js').getLogger('app:persistence:models');

const models = {};
fs.readdirSync(__dirname)
  .map((name) => (name.indexOf('.js') > 0 ? path.basename(name, '.js') : name))
  .filter((name) => name !== 'index')
  .map((name) => {
    log.debug(`initializing model ${name}`);
    const Model = require(`./${path.basename(name, '.js')}`);
    models[name] = Model;
  });

module.exports = models;
