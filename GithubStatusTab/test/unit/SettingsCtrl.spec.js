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
         alertService;

    beforeEach(module('githubStatusApp'));

    beforeEach(module(function($provide) {
        userService = {
            save: function() {}
        };

        githubService = {
            getUser: function() {}
        };

        alertService = {
            alert: function() {}
        };

        $provide.value('UserService', userService);
        $provide.value('GithubService', githubService);
        $provide.value('alertService', alertService);
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
        spyOn(alertService, 'alert');


        $controllerConstructor('SettingsCtrl', { $scope: scope });

    }));

    describe('When saving a user', function() {

        var returnUser;

        var resolveData = function() {
            returnUser = { login: 'test' };
            deferred.resolve(returnUser);
            $rootScope.$digest();
        };

        it('should call getUser when save', function () {
           
            scope.save('test');
            resolveData();
            expect(userService.save).toHaveBeenCalledWith(returnUser);
        });

        it('should call alert with some parameters', function() {
            scope.save('test');
            resolveData();
            expect(alertService.alert).toHaveBeenCalledWith('success', returnUser.login + ' successfully added!');
        });

        it('should call location path', function() {
            scope.save('test');
            resolveData();
            expect($location.path).toHaveBeenCalledWith('/');
        });

        it('should call alert with error message when get user fails', function() {
            scope.save('test');

            var errorData = { message: "test a failure" };
            deferred.reject(errorData);
            $rootScope.$digest();
            expect(alertService.alert).toHaveBeenCalledWith('danger', "GitHub Api Exception", errorData.message);
        });

    });

});