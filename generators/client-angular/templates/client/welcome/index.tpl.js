const angular = require('angular');
const index = angular.module('<%= name %>.welcome', [
  require('./nyan_cat/index').name,
]);

// define components
index.controller('WelcomeController', require('./welcome_controller'));

module.exports = index;
