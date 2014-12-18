angular.module('githubStatusApp').factory('UserService', [function () {

    var service = {
        user: {},
        save: function (githubUser) {
            service.user = githubUser;
            localStorage.githubStatus = angular.toJson(githubUser);
        },
        restore: function () {
            service.user = angular.fromJson(localStorage.githubStatus);
            return service.user;
        }
    };

    service.restore();
    return service;
}]);