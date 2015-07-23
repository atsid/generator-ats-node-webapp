const angular = require('angular');
const index = angular.module('<%= name %>.services', []);
index.service('NyanService', require('./nyan_service'));
module.exports = index;
