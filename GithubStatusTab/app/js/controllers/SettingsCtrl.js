app.controller('SettingsCtrl', [
    '$scope', '$location', 'UserService', 'GithubService', 'alert', function ($scope, $location, userService, githubService, alert) {

        $scope.save = function () {
            //get userobject from github service
            githubService.getUser($scope.userName)
                .then(function (data) {
                    userService.save(data);
                    alert('success', data.login + " successfully added!");
                    $location.path('/');
                }).catch(function (error) {
                    userService.user = {};
                    alert('danger', "GitHub Api Exception", error.message);
                });
        };
    }
]);