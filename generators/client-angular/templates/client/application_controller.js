/**
 * An Angular Controller class for the Application View
 */
class ApplicationController {
    constructor($rootScope) {
        console.log("entered application controller");
        $rootScope.$on('$stateChangeError', () => console.log("statechange error", arguments));
        $rootScope.$on('$stateNotFound', () => console.log("state not found", arguments));
    }
}

ApplicationController.$inject = ['$rootScope'];
module.exports = ApplicationController;
