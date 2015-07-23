const angular = require('angular');
const index = angular.module('<%= name %>.welcome', [
    require('./nyan_cat/index').name,
]);

// define components
index.controller('WelcomeController', require('./welcome_controller'));

// include templates
require('public/welcome/welcome.html');

module.exports = index;
