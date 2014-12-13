'use strict';

describe('DurationService', function() {

    var service;
    var sinceDate = "2014-01-01";

    beforeEach(module('githubStatusApp'));
    beforeEach(inject(function (DurationService) {
        service = DurationService;
    }));

    var getDuration = function(currentString, sinceString) {
        var currentDate = new Date(currentString);
        var sinceDate = new Date(sinceString);
        return service.getDuration(currentDate, sinceDate);
    };

    it('should return 1 day duration when dates 1 day apart',
        function() {
            var duration = getDuration('1/2/2014', sinceDate);
            expect(duration.days).toBe(1);
        });

    it('Should return 1 hour duration when dates 1 hour apart', function() {
        var duration = getDuration("2014-01-01T01:00:00", sinceDate);
        expect(duration.hours).toBe(1);
    });

    it('Should return 1 min duration when dates 1 min apart', function() {
        var duration = getDuration('2014-01-01T00:01:00', sinceDate);
        expect(duration.minutes).toBe(1);
    });

    it('Should return 1 second duration when dates 1 sec apart', function() {
        var duration = getDuration('2014-01-01T00:00:01', sinceDate);
        expect(duration.seconds).toBe(1);
    });
});