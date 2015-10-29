const fs = require('fs');
const path = require('path');

function initialize(models) {
  const result = {};
  fs.readdirSync(__dirname)
    .map((name) => (name.indexOf('.js') > 0 ? path.basename(name, '.js') : name))
    .filter((name) => name !== 'index')
    .map((name) => {
      const Repository = require(`./${path.basename(name, '.js')}`);
      result[name] = new Repository(models);
    });
  return result;
}

module.exports = {initialize};
