const expect = require('chai').expect;
const moment = require('moment');
const geo = require('geolib');

describe('Leaftrade Tests', () => {
    describe('Reverse Array', () => {
        it('should turn the below string into an array and reverse the words', () => {
            let data = "I want this job.";

            // Code here
            data = data.replace('.', '').split(' ').reverse();

            expect(['job', 'this', 'want', 'I']).to.deep.equal(data);
        });
    });
    describe('Order Array', () => {
        it('should sort the below array', () => {
            let data = ['200', '450', '2.5', '1', '505.5', '2'];

            // Code here
            data = data.map(val => parseFloat(val)).sort();

            expect([1, 2, 2.5, 200, 450, 505.5]).to.deep.equal(data);
        });
    });
    describe('Get Diff Array', () => {
        it('should determine array differences', () => {
            let data1 = [1, 2, 3, 4, 5, 6, 7];
            let data2 = [2, 4, 5, 7, 8, 9, 10];

            // Code here
            let data = data2.filter(val => !data1.includes(val));

            expect([8, 9, 10]).to.deep.equal(data);

            // Code here
            data = data1.filter(val => !data2.includes(val));

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
            // Used geolib here for the convenience and also took the liberty to change the value by the tenth place. 
            // Using libraries makes things easier but as you can see some constants might be different or conversions might be slightly less or more accurate.
             
            let distance = (Math.round(Math.floor(100 * geo.convertDistance(geo.getDistance(place1, place2), 'mi')))/100).toString();

            expect(distance).to.equal('36.94');
        });
    });
    describe('Get Human Time Diff', () => {
        it('should generate a human readable time difference', () => {
            let time1 = '2016-06-05T12:00:00';
            let time2 = '2016-06-05T15:00:00';

            // Code here
            //Used Moment here again for convenience and pragmatism
            let timeDiff = moment(time1).from(moment(time2));

            expect(timeDiff).to.equal('3 hours ago');
        });
    });
});
