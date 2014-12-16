'use strict';

describe('SettingsCtrl', function() {

    var scope,
        $controllerConstructor,
        $location,
        userService,
        githubService,
        $q,
        $rootScope,
        deferred,
         alert;

    beforeEach(module('githubStatusApp'));

    beforeEach(module(function($provide) {
        console.log('start provider set up');
        userService = {
            save: function() {}
        };

        githubService = {
            getUser: function() {}
        };

        alert = function() { return "test alert"};

        $provide.value('UserService', userService);
        $provide.value('GithubService', githubService);
        $provide.value('alert', alert);
        console.log('test 1');
    }));

    beforeEach(inject(function(_$controller_, _$location_, _$rootScope_, _$q_) {

        
        $controllerConstructor = _$controller_;
         $rootScope = _$rootScope_;
        scope = $rootScope.$new();

        $q = _$q_;

        deferred = $q.defer();        

        $location = _$location_;

        spyOn($location, 'path');
        spyOn(userService, 'save');
        spyOn(githubService, 'getUser').and.returnValue(deferred.promise);

        console.log(scope);
        $controllerConstructor('SettingsCtrl', { $scope: scope });

    }));

    describe('When saving a user', function() {
        it('should call getUser when save', function() {
           
            scope.save('test');

            var returnUser = { login: 'test' };

            deferred.resolve(returnUser);
            $rootScope.$digest();

            expect(userService.save).toHaveBeenCalledWith(returnUser);

        });
    });

});