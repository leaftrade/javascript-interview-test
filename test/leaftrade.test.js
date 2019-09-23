const expect = require('chai').expect;


function split_reverse(myString) {
    myString = myString.replace('.', '');
    data = myString.split(' ');
    data = data.reverse();
    return data;
}


function array_diff(a, b) {
    var result = a.filter(function(elem) {
        return !b.includes(elem)
    })
    return result;
}


function time_diff(time2, time1) {
    var second = 1000;
    var minute = second * 60;
    var hour = minute * 60;
    var day = hour * 24;
    var year = day * 365;
    var time_diff = Date.parse(time2) - Date.parse(time1);
    var outstr = [];
    var diff_years = Math.floor(time_diff / year)
    if (diff_years > 0) {
        outstr.push(diff_years + ' years');
        time_diff = time_diff - (diff_years * year)
    }
    var diff_days = Math.floor(time_diff / day) % day
    if (diff_days > 0) {
        outstr.push(diff_days + ' days');
        time_diff = time_diff - (diff_days * day)
    }
    var diff_hours = Math.floor(time_diff / hour) % hour
    if (diff_hours > 0) {
        outstr.push(diff_hours + ' hours');
        time_diff = time_diff - (diff_hours * hour)
    }
    var diff_minutes = Math.floor(time_diff / minute) % minute
    if (diff_minutes > 0) {
        outstr.push(diff_minutes + ' minutes');
        time_diff = time_diff - (diff_minutes * minute)
    }
    var diff_seconds = Math.floor(time_diff / second) % second
    if (diff_seconds > 0) {
        outstr.push(diff_seconds + ' seconds');
        time_diff = time_diff - (diff_seconds * second)
    }
    outstr = outstr.join(", ")
    outstr += ' ago'
    return outstr;
}


if (typeof(Number.prototype.toRadians) === "undefined") {
    Number.prototype.toRadians = function() {
        return this * Math.PI / 180;
    }
}

function geo_distance(place1, place2) {
    var earth_radius = 3959; // radius in miles
    var lat1 = parseFloat(place1.lat).toRadians();
    var lat2 = parseFloat(place2.lat).toRadians();
    var lon1 = parseFloat(place1.lon).toRadians();
    var lon2 = parseFloat(place2.lon).toRadians();
    var lat_diff = lat2 - lat1;
    var lon_diff = lon2 - lon1;

    var a = Math.sin(lat_diff / 2) * Math.sin(lat_diff / 2) +
        Math.cos(lat1) * Math.cos(lat2) *
        Math.sin(lon_diff / 2) * Math.sin(lon_diff / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = earth_radius * c;
    return d.toFixed(2).toString();
}


describe('Leaftrade Tests', () => {
    describe('Reverse Array', () => {
        it('should turn the below string into an array and reverse the words', () => {
            let data = "I want this job.";

            // Code here
            data = split_reverse(data);

            expect(['job', 'this', 'want', 'I']).to.deep.equal(data);
        });
    });
    describe('Order Array', () => {
        it('should sort the below array', () => {
            let data = ['200', '450', '2.5', '1', '505.5', '2'];

            // Code here
            // N.B.: I did not use a helper function in this case.
            data = data.sort()
            data = data.map(parseFloat)

            expect([1, 2, 2.5, 200, 450, 505.5]).to.deep.equal(data);
        });
    });
    describe('Get Diff Array', () => {
        it('should determine array differences', () => {
            let data1 = [1, 2, 3, 4, 5, 6, 7];
            let data2 = [2, 4, 5, 7, 8, 9, 10];

            // Code here
            // Assuming we want entries in data2 not in data1
            data = array_diff(data2, data1);
            expect([8, 9, 10]).to.deep.equal(data);

            // Code here
            // Assuming we want entries in data1 not in data2
            data = array_diff(data1, data2);
            expect([1, 3, 6]).to.deep.equal(data);
        });
    });
    describe('Get Distance', () => {
        it('should get the distance between two geo points', () => {
            let place1 = {
                lat: '41.9641684',
                lon: '-87.6859726',
            };
            let place2 = {
                lat: '42.1820210',
                lon: '-88.3429465',
            };

            // Code here
            distance = geo_distance(place1, place2);
            expect(distance).to.equal('36.91');
        });
    });
    describe('Get Human Time Diff', () => {
        it('should generate a human readable time difference', () => {
            let time1 = '2016-06-05T12:00:00';
            let time2 = '2016-06-05T15:00:00';

            // Code here
            timeDiff = time_diff(time2, time1);
            expect(timeDiff).to.equal('3 hours ago');
        });
    });
});
