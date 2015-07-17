'use strict';
var yeoman = require('yeoman-generator');

module.exports = yeoman.generators.Base.extend({
  initializing: require('./phases/initializing'),
  prompting: require('./phases/prompting'),
  writing: require('./phases/writing'),
  install: require('./phases/install')
});
