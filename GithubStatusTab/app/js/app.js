var app = angular.module('githubStatusApp', ['ngRoute']).config(function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: './templates/home.html',
        controller: 'MainCtrl'
    }).when('/settings', {
        templateUrl: './templates/settings.html',
        controller: 'SettingsCtrl'
    }).otherwise({redirectsTo:'/'});
});




