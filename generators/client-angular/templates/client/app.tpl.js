/**
 * Assemble the Application Module
 */
const angular = require('angular');
const appModule = angular.module('<%= name %>', [
  // Third Party Modules
  'ui.router',
  'ngMaterial',

  // Application Modules
  require('./services/index').name,
  require('./welcome/index').name,
]);
appModule.controller('ApplicationController', require('./application_controller'));

/**
 * Set up State-Based Routing
 */
appModule.config([
  '$stateProvider',
  '$urlRouterProvider',
  '$locationProvider',
  ($stateProvider, $urlRouterProvider, $locationProvider) => {
    $locationProvider.html5Mode(true);

    $stateProvider.state('app', {
      url: '/?target',
      templateUrl: '/welcome/welcome.html',
      controller: 'WelcomeController as ctrl',
      resolve: {
        // Use array-style injection for strict-di
        welcomeTarget: ['$stateParams', ($stateParams) => {
          return $stateParams.target || 'World';
        }],
      },
    });
    $urlRouterProvider.otherwise('/');
  }]);

angular.bootstrap(document, [appModule.name], {strictDi: true});
