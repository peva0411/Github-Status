angular.module('githubStatusApp')
    .directive('userInfo', function() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
          user:'='  
        },
        templateUrl: '././templates/userInfo.html',
        controller: function ($scope, UserService) {
            $scope.hasUser = false;

            $scope.user = UserService.user;

        }

    };


});