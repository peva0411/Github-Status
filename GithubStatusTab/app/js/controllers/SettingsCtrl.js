app.controller('SettingsCtrl', [
    '$scope', '$location', 'UserService', 'GithubService', 'alertService', function ($scope, $location, userService, githubService, alertService) {

        $scope.save = function () {
            //get userobject from github service
            githubService.getUser($scope.userName)
                .then(function (data) {
                    userService.save(data);
                    alertService.alert('success', data.login + " successfully added!");
                    $location.path('/');
                }).catch(function (error) {
                    userService.user = {};
                    alertService.alert('danger', "GitHub Api Exception", error.message);
                });
        };
    }
]);