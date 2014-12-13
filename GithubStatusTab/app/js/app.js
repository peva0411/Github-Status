var app = angular.module('githubStatusApp', ['ngRoute']).config(function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: './templates/home.html',
        controller: 'MainCtrl'
    }).when('/settings', {
        templateUrl: './templates/settings.html',
        controller: 'SettingsCtrl'
    }).otherwise({redirectsTo:'/'});
});


app.factory('GithubService', ['$q', "$http", function ($q, $http) {

    var apiEndpoint = "https://api.github.com/users";

    var getGithubData = function(user, route) {
        var defered = $q.defer();

        var requestUrl = [apiEndpoint, user].join('/');

        if (route.length > 0)
            requestUrl += "/" + route;

        $http.get(requestUrl)
            .success(function(data) {
                defered.resolve(data);
            })
            .error(function(reason) {
                defered.reject(reason);
            });

        return defered.promise;

    };

    return {
        getEvents: function (user) {
            return getGithubData(user, 'events');
        },
        getUser:function(user) {
            return getGithubData(user, '');
        }
    };
}]);

app.factory('UserService', [function() {

    var service = {
        user: {},
        save: function (githubUser) {
           service.user = githubUser;
           localStorage.githubStatus = angular.toJson(githubUser);
        },
        restore: function() {
            service.user = angular.fromJson(localStorage.githubStatus);
            return service.user;
        }
    };

    service.restore();
    return service;
}]);