const chai = require('chai');
const chaiAlmost = require('chai-almost');
const expect = require('chai').expect;
const GeoPoint = require('geopoint');
const moment = require('moment');

describe('Leaftrade Tests', () => {
    describe('Reverse Array', () => {
        it('should turn the below string into an array and reverse the words', () => {
            let data = "I want this job.";
            // Code here
            let output = (input) => {
                // NB this is only suitable for American English.
                let cleaned = input.replace(/[^a-zA-Z ]+/g, '').replace('/ {2,}/', ' ')
                return cleaned.split(" ").reverse()
            };

            data = output(data);
            expect(['job', 'this', 'want', 'I']).to.deep.equal(data);
        });
    });
    describe('Order Array', () => {
        it('should sort the below array', () => {
            let data = ['200', '450', '2.5', '1', '505.5', '2'];

            // Code here
            let num_sort = (data) => {
                return data.sort((a, b) => a - b);
            };
            data = num_sort(data).map(Number);
            expect([1, 2, 2.5, 200, 450, 505.5]).to.deep.equal(data);
        });
    });
    describe('Get Diff Array', () => {
        it('should determine array differences', () => {
            let data1 = [1, 2, 3, 4, 5, 6, 7];
            let data2 = [2, 4, 5, 7, 8, 9, 10];

            // Code here
            let array_diff = (first, second) => {
                const setA = new Set(first);
                const setB = new Set(second);
                var _difference = new Set(setA);
                for (const elem of setB) {
                    _difference.delete(elem);
                }
                return Array.from(_difference);
            };

            let data = array_diff(data2, data1);
            expect([8, 9, 10]).to.deep.equal(data);

            // Code here
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
            let dist_in_miles = (point1, point2) => {
                var p1 = new GeoPoint(Number(point1.lat), Number(point1.lon));
                var p2 = new GeoPoint(Number(point2.lat), Number(point2.lon));
                return p1.distanceTo(p2, false);
            };

            chai.use(chaiAlmost(.01))
            distance = dist_in_miles(place1, place2);
            expect(distance).to.almost.eql(36.91);
        });
    });

    describe('Get Human Time Diff', () => {
        it('should generate a human readable time difference', () => {
            let time1 = '2016-06-05T12:00:00';
            let time2 = '2016-06-05T15:00:00';

            // Code here
            let time_diff = (date1, date2) => {
                return moment(date2).to(moment(date1))
            };

            timeDiff = time_diff(time1, time2);
            expect(timeDiff).to.equal('3 hours ago');
        });
    });
});
