'use strict';

describe('alertService', function() {

    var $rootScope,
        $timeout,
        alertService;

    beforeEach(module('githubStatusApp'));

    beforeEach(inject(function(_$rootScope_, _$timeout_, _alertService_) {

        $rootScope = _$rootScope_.$new();

        $timeout = _$timeout_;
        alertService = _alertService_;

    }));

    describe('when alert called ', function() {

        it('should add alert object to rootscope with correct type', function() {
            alertService.alert("warning", "title", "message");
            expect($rootScope.alert.type).toEqual("warning");
        });

        it('should add alert object to rootscope with correct message', function() {
            alertService.alert("warning", "title", "testMessage");
            expect($rootScope.alert.message).toEqual("testMessage");
        });

        it('should add alert object to rootscope with correct title', function () {
            alertService.alert("warning", "testTitle", "testMessage");
            expect($rootScope.alert.title).toEqual("testTitle");
        });

        it('should add alert object with show set to true', function() {
            alertService.alert('warning', "title", "message");
            expect($rootScope.alert.show).toBeTruthy();
        });

        it('should add alert object with show set to true', function () {
            alertService.alert('warning', "title", "message");
            expect($rootScope.alert.show).toBeTruthy();
        });

        it('should change show to false after timeout', function() {
            alertService.alert('warning', 'title', 'message');
            $timeout.flush();
            expect($rootScope.alert.show).toBeFalsy();

        });
    });

});