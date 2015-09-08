/**
 * An Angular Controller class for the Application View
 */
class ApplicationController {
    constructor($rootScope, $log) {
        $rootScope.$on('$stateChangeError', function onStateChangeError() {
            $log.error('statechange error', arguments);
        });
        $rootScope.$on('$stateNotFound', function onStateNotFound() {
            $log.error('state not found', arguments);
        });
    }
}

ApplicationController.$inject = ['$rootScope', '$log'];
module.exports = ApplicationController;
