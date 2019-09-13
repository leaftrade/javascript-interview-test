const expect = require('chai').expect;
const utilities = require('../src/utilities');

describe('Leaftrade Tests', () => {
    describe('Reverse Array', () => {
        it('should turn the below string into an array, reverse the words, and remove punctuation', () => {
            let data = "I want this job.";

            result = utilities.reverseArray(data)
            // Code here

            expect(['job', 'this', 'want', 'I']).to.deep.equal(result);
        });
    });
    describe('Order Array', () => {
        it('should sort the below array and return a numerical array', () => {
            let data = ['200', '450', '2.5', '1', '505.5', '2'];

            result = utilities.orderArray(data)

            expect([1, 2, 2.5, 200, 450, 505.5]).to.deep.equal(result);
        });
    });
    describe('Get Diff Array', () => {
        it('should determine array differences', () => {
            let data1 = [1, 2, 3, 4, 5, 6, 7];
            let data2 = [2, 4, 5, 7, 8, 9, 10];

            result1 = utilities.diffArray(data1, data2)

            expect([8, 9, 10]).to.deep.equal(result1);

            result2 = utilities.diffArray(data2, data1)

            expect([1, 3, 6]).to.deep.equal(result2);
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

            distance = utilities.haversineDistanceMiles(place1, place2)

            expect(distance).to.equal('36.91');
        });
    });
    describe('Get Human Time Diff', () => {
        it('should generate a human readable time difference', () => {
            let time1 = '2016-06-05T12:00:00';
            let time2 = '2016-06-05T15:00:00';

            timeDiff = utilities.timeDeltaHuman(time1, time2)

            expect(timeDiff).to.equal('3 hours ago');
        });
    });
});
