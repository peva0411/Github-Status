angular.module('githubStatusApp')
    .directive('pluralize', function() {
    return{
        restrict: 'E',
        scope: {
            text: '@',
            value: '@'
        },
        template: "<div></div>",
        replace: true,
        link: function(scope, el) {
            scope.$watch('value', function(newVal) {
                if (newVal !== '1') {
                    el.html(scope.text + 's');
                } else {
                    el.html(scope.text);
                }
            });
        }
    };
})