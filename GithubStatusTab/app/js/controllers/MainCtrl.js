angular.module('githubStatusApp')
    .controller('MainCtrl', ['$scope', '$timeout', 'GithubService', 'DurationService', 'UserService', 'alertService', function ($scope, $timeout, githubService, durationService, userService, alertService) {

    $scope.getMostRecentEvent = function (user) {
        $scope.isLoading = true;

        var startTime = new Date();

        var updateEvents = function (events) {
            $scope.event = events[0];
            $scope.duration = durationService.getDuration(new Date(), events[0].created_at);
            updateTime();
        };

        var updateTime = function () {
            var currentTime = new Date();
            var diff = Math.abs(currentTime - startTime);

            if (diff > 60000) {
                startTime = new Date();
                githubService.getEvents(user)
                    .then(updateEvents)
                    .catch(function (reason) { alertService.alert('danger','', reason.message); });
            } else {
                $scope.duration = durationService.getDuration(new Date(), $scope.event.created_at);
                $timeout(updateTime, 1000);
            }
        };

        githubService.getEvents(user)
            .then(function (events) {
                if (events.length > 0) {
                    $scope.hasEvents = true;
                    updateEvents(events);
                } else {
                    $scope.hasEvents = false;
                }
            })
            .catch(function (reason) {
                alertService.alert('danger', '', reason);
            }).finally(function () {
                $scope.isLoading = false;
            });
    };

    if (userService.user) {
        $scope.getMostRecentEvent(userService.user.login);
    }
}]);