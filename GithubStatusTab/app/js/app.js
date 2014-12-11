var app = angular.module('githubStatusApp', ['ngRoute']).config(function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: './templates/home.html',
        controller: 'MainCtrl'
    }).when('/settings', {
        templateUrl: './templates/settings.html',
        controller: 'SettingsCtrl'
    }).otherwise({redirectsTo:'/'});
});

app.controller('MainCtrl',['$scope', '$timeout', 'GithubService', 'DurationService', 'UserService', function($scope, $timeout, githubService, durationService, userService) {

    $scope.getMostRecentEvent = function (user) {
        var startTime = new Date();

        var updateEvents = function(events) {
            $scope.event = events[0];
            $scope.duration = durationService.getDuration(events[0].created_at);
            updateTime();
        };

        var updateTime = function () {
            var currentTime = new Date();
            var diff = Math.abs(currentTime - startTime);

            if (diff > 60000) {
                startTime = new Date();
                githubService.getEvents(user)
                    .then(updateEvents)
                    .catch(function (reason) { alert(reason); });
            } else {
                $scope.duration = durationService.getDuration($scope.event.created_at);
                $timeout(updateTime, 1000);
            }
        };

        githubService.getEvents(user)
            .then(updateEvents)
            .catch(function (reason) {
                alert(reason);
            });
    };
    
    if (userService.user) {
        $scope.getMostRecentEvent(userService.user.login);
    }
}]);


app.controller('SettingsCtrl', [
    '$scope', '$location', 'UserService', 'GithubService', function($scope, $location, userService, githubService) {

        $scope.save = function () {
            //get userobject from github service
            githubService.getUser($scope.userName)
                .then(function (data) {
                    userService.save(data);
                    $location.path('/');
            }).catch(function(error) {
                alert(error);
            });
        };
    }
]);

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


app.factory('DurationService', function() {
    return {
        getDuration: function(sinceDate) {
            //subtract dates 
            var now = new Date();
            var since = new Date(sinceDate);
            var difference = Math.abs(now - since);

            var duration = moment.duration(difference);
        
            return {
                days: duration.days(),
                hours: duration.hours(),
                minutes: duration.minutes(),
                seconds: duration.seconds()
            };
        }
    };
});


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