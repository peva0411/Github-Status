angular.module('githubStatusApp')
    .service('alert', function($rootScope, $timeout) {
        var alertTimeout;
    return function(type, title, message, timeout) {
        $rootScope.alert = {
            type: type,
            hasBeenShown: true,
            show: true,
            message: message,
            title: title
        };
        $timeout.cancel(alertTimeout);
        alertTimeout = $timeout(function() {
            $rootScope.alert.show = false;
        }, timeout || 3000);
    };
});