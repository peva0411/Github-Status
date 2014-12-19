'use strict';

describe('GithubService', function() {

    var $httpBackend,
        service,
        githubUrl = 'https://api.github.com/users';
    var userName = 'testUser';

    beforeEach(module('githubStatusApp'));

    beforeEach(inject(function(_$httpBackend_, _GithubService_) {
        service = _GithubService_;
        $httpBackend = _$httpBackend_;
    }));

    describe('When getUser', function() {
        it('Should make call to api', function() {
            $httpBackend.expectGET(githubUrl + '/' + userName).respond(200);
            service.getUser(userName);
            $httpBackend.verifyNoOutstandingExpectation();
        });

        it('Should send an error when API fails', function() {
            $httpBackend.whenGET(githubUrl + '/' + userName).respond(500);
            var err;
            service.getUser(userName).catch(function(e) {
                err = e;
            });
            $httpBackend.flush();
            expect(err).toBeDefined();
        });

        it('Should send user data when API is successful', function() {
            $httpBackend.whenGET(githubUrl + '/' + userName).respond(200, {
                login: userName
            });

            var returnData;

            service.getUser(userName).then(function(d) {
                returnData = d;
            });
            $httpBackend.flush();
            expect(returnData.login).toEqual(userName);
        });
    });
    describe('When getEvents', function () {
        var eventUrl = githubUrl + '/' + userName + '/events';

        it('Should make call to api', function () {
            $httpBackend.expectGET(eventUrl).respond(200);
            service.getEvents(userName);
            $httpBackend.verifyNoOutstandingExpectation();
        });

        it('Should send back error when API fails', function() {
            $httpBackend.whenGET(eventUrl).respond(500);
            var err;
            service.getEvents(userName).catch(function(e) {
                err = e;
            });

            $httpBackend.flush();
            expect(err).toBeDefined();
        });

        it('Should send user data when API is successful', function () {
            $httpBackend.whenGET(eventUrl).respond(200, [{
                eventType:'push'
            }]);

            var returnData;

            service.getEvents(userName).then(function (d) {
                returnData = d;
            });
            $httpBackend.flush();
            expect(returnData[0].eventType).toEqual('push');
        });

    });
});