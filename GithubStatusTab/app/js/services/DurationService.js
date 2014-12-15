angular.module('githubStatusApp')
    .factory('DurationService', function () {
    return {
        getDuration: function (nowDate, sinceDate) {
            //subtract dates 
            var now = new Date(nowDate);
            var since = new Date(sinceDate);
            var difference = Math.abs(now - since);

            var duration = moment.duration(difference);

            return {
                days: duration.days(),
                hours: duration.hours(),
                minutes: duration.minutes(),
                seconds: duration.seconds()
            };
        }
    };
});