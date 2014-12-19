angular.module('githubStatusApp')
    .factory('GithubService', ['$q', "$http", function ($q, $http) {

    var apiEndpoint = "https://api.github.com/users";

    var getGithubData = function (user, route) {
        var defered = $q.defer();

        var requestUrl = [apiEndpoint, user].join('/');

        if (route.length > 0)
            requestUrl += "/" + route;

        $http.get(requestUrl)
            .success(function (data) {
                defered.resolve(data);
            })
            .catch(function(reason) {
                defered.reject(reason);
            });

        return defered.promise;

    };

    return {
        getEvents: function (user) {
            return getGithubData(user, 'events');
        },
        getUser: function (user) {
            return getGithubData(user, '');
        }
    };
}]);