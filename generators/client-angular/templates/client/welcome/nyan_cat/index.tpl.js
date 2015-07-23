const angular = require('angular');
const index = angular.module('<%= name %>.welcome.nyancat', []);

// Nyan-Cat Directive Example
index.directive('nyanCat', require('./nyan_cat'));
index.controller('NyanCatController', require('./nyan_cat_controller'));

module.exports = index;
