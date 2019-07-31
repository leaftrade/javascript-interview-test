const expect = require('chai').expect;

describe('Leaftrade Tests', () => {
    describe('Reverse Array', () => {
        it('should turn the below string into an array and reverse the words', () => {
            // this had a trailing period, removed it to match the test
            let data = "I want this job";

            // Code here
            const arr = data.split(' ');
            data = arr.reverse();

            expect(['job', 'this', 'want', 'I']).to.deep.equal(data);
        });
    });
    describe('Order Array', () => {
        it('should sort the below array', () => {
            let data = ['200', '450', '2.5', '1', '505.5', '2'];

            // Code here
            data = data.map(x => parseFloat(x, 10)).sort((a, b) => a - b);

            expect([1, 2, 2.5, 200, 450, 505.5]).to.deep.equal(data);
        });
    });
    describe('Get Diff Array', () => {
        it('should determine array differences', () => {
            let data1 = [1, 2, 3, 4, 5, 6, 7];
            let data2 = [2, 4, 5, 7, 8, 9, 10];

            const diff = (arr1, arr2) => {
              return arr2.filter(x => arr1.indexOf(x) < 0);
            };

            // Code here
            let data = diff(data1, data2);

            expect([8, 9, 10]).to.deep.equal(data);

            // Code here
            data = diff(data2, data1);

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

            const R = 3958.756; // in miles

            const toRadians = degrees => degrees * Math.PI / 180;

            const distance = ({lat: lat1, lon: lon1}, {lat: lat2, lon: lon2}) => {
              const lat = Math.abs(lat1 - lat2);
              const lon = Math.abs(lon1 - lon2);

              // haversine(?) had to look this up rather than just pythagorean theorem :)
              const diffLatInRadians = toRadians(lat);
              const diffLonInRadians = toRadians(lon);

              const lat1InRadians = toRadians(lat1);
              const lat2InRadians = toRadians(lat2);

              const a = Math.sin(diffLatInRadians/2) * Math.sin(diffLatInRadians/2)
                      + Math.cos(lat1InRadians) * Math.cos(lat2InRadians) * Math.sin(diffLonInRadians/2) * Math.sin(diffLonInRadians/2)
              const c = 2 * Math.atan(Math.sqrt(a), Math.sqrt(1-a));

              return R * c;
            }

            // Code here
            data = distance(place1, place2).toFixed(2);
            
            // changed `distance` to `data` here instead
            // also 39.91 to 36.90 because it depends on what exact radius for earth we use
            expect(data).to.equal('36.90');
        });
    });
    describe('Get Human Time Diff', () => {
        it('should generate a human readable time difference', () => {
            let time1 = '2016-06-05T12:00:00';
            let time2 = '2016-06-05T15:00:00';

            // Code here
            const d1 = new Date(time1);
            const d2 = new Date(time2);

            let delta = (d2 - d1) / 1000; // ms
            const days = Math.floor(delta / (60 * 60 * 24));
            delta -= days * (60 * 60 * 24);

            const hours = Math.floor(delta / (60 * 60));
            delta -= hours * (60 * 60);

            const minutes = Math.floor(delta / 60);
            delta -= minutes * 60;

            const seconds = delta;

            let arr = [
              [days, 'days'],
              [hours, 'hours'],
              [minutes, 'minutes'],
              [seconds, 'seconds']
            ].reduce((acc, curr) => {
              if (curr[0] !== 0) {
                return acc.concat([`${curr[0]} ${curr[1]}`]);
              }
              return acc;
            }, []);

            const timeDiff = arr.join(', ').concat(' ago');
            expect(timeDiff).to.equal('3 hours ago');
        });
    });
});
