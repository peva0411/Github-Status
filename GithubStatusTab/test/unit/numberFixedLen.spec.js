'use strict';

describe('numberFixedLen filter', function() {
    var filter;

    beforeEach(module('githubStatusApp'));

    beforeEach(inject(function($filter) {
        filter = $filter('numberFixedLen');
    }));

    it('should return 01 for 1',
        function () {
            var result = filter(1, 2);

        expect(result).toEqual('01');
        });

    it('Should return 001 for 1 and 3 digits', function() {
        expect(filter(1, 3)).toEqual('001');
    });

    it('Should return 1 for 1 and 1 digit', function() {
        expect(filter(1, 1)).toEqual('1');
    });



});