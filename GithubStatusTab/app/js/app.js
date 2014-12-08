var app = angular.module('githubStatusApp', []);

app.controller('MainCtrl',['$scope', '$timeout', 'EventService', 'DurationService', function($scope, $timeout, eventService, durationService) {
    $scope.getMostRecentEvent = function(user) {

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
                eventService.getEvents(user)
                    .then(updateEvents)
                    .catch(function (reason) { alert(reason); });
            } else {
                $scope.duration = durationService.getDuration($scope.event.created_at);
                $timeout(updateTime, 1000);
            }
        };

        eventService.getEvents(user)
            .then(updateEvents)
            .catch(function (reason) {
                alert(reason);
            });
    };

    $scope.getMostRecentEvent('peva0411');

}]);

app.factory('EventService', ['$q', "$http", function ($q, $http) {

    var apiEndpoint = "https://api.github.com/users/";

    return {
        getEvents: function(user) {
            var defered = $q.defer();

            var requestUrl = apiEndpoint + user + '/events';

            $http.get(requestUrl)
                .success(function(data) {
                    defered.resolve(data);
                })
                .error(function(reason) {
                    defered.reject(reason);
                });

            return defered.promise;
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
