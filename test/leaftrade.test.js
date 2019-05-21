const expect = require('chai').expect;

describe('Leaftrade Tests', () => {
    describe('Reverse Array', () => {
        it('should turn the below string into an array and reverse the words', () => {
            let data = "I want this job.";

            /* I noted that we wanted to remove the period as well so I got rid of it,
               but wasn't sure if a full implementation should remove ALL non alphanumeric
               characters. */
            data = data.replace('.', '').split(' ').reverse();

            expect(['job', 'this', 'want', 'I']).to.deep.equal(data);
        });
    });
    describe('Order Array', () => {
        it('should sort the below array', () => {
            let data = ['200', '450', '2.5', '1', '505.5', '2'];

            data = data.map(val => parseFloat(val)).sort();

            expect([1, 2, 2.5, 200, 450, 505.5]).to.deep.equal(data);
        });
    });
    describe('Get Diff Array', () => {
        it('should determine array differences', () => {
            let data1 = [1, 2, 3, 4, 5, 6, 7];
            let data2 = [2, 4, 5, 7, 8, 9, 10];

            const data1Set = new Set(data1);
            const data2Set = new Set(data2)

            let data = data2.filter(val => !data1Set.has(val));

            expect([8, 9, 10]).to.deep.equal(data);

            data = data1.filter(val => !data2Set.has(val));

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

            const geodist = require('geodist');
            /* I used the geodist lib to do this calculation and based on the expected result
               it seemed like you wanted the result to the nearest hundreth rounded down. */
            const distance = (Math.round(Math.floor(
                    100 * geodist(place1, place2, {exact: true, unit: 'mi'}))) / 100).toString();
            expect(distance).to.equal('36.91');
        });
    });
    describe('Get Human Time Diff', () => {
        it('should generate a human readable time difference', () => {
            let time1 = '2016-06-05T12:00:00';
            let time2 = '2016-06-05T15:00:00';

            /* Based on the expectation I made a solution that tells you how many hours
               ago or ahead time1 is from time2 */
            const timediff = require('timediff');
            const hourDiff = timediff(time1, time2, 'H');
            const messageEnd = (hourDiff.hours > 0) ? 'ago' : 'ahead';
            const timeDiff = hourDiff.hours + ' hours ' + messageEnd;

            expect(timeDiff).to.equal('3 hours ago');
        });
    });
});
