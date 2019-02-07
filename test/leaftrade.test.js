const expect = require('chai').expect;
const numeral = require('numeral')
const moment = require('moment')
const _ = require('lodash')

function splitAndReverse(str, splitAt = /\W/) {
  return _(str.split(splitAt)).reverse().filter().value()
}

function sortNumericStrings(nums) {
  return _(nums).map(Number).sortBy().value()
}

function toRad(n) {
  return Number(n) * (Math.PI / 180)
}

function greatCircle(fromDeg, toDeg) {
  const r = 6372 * 0.621371

  const from = {
    lat: toRad(fromDeg.lat),
    lon: toRad(fromDeg.lon),
  }
  const to = {
    lat: toRad(toDeg.lat),
    lon: toRad(toDeg.lon),
  }

  const sinLatAvg = Math.sin((from.lat - to.lat) / 2)
  const sinLonAvg = Math.sin((from.lon - to.lon) / 2)

  const angle = 2 * Math.asin(Math.sqrt((sinLatAvg * sinLatAvg) + Math.cos(from.lat) * Math.cos(to.lat) * sinLonAvg * sinLonAvg))
  return r * angle
}

describe('Leaftrade Tests', () => {
    describe('Reverse Array', () => {
        it('should turn the below string into an array and reverse the words', () => {
            const data = "I want this job.";

            const result = splitAndReverse(data)

            expect(['job', 'this', 'want', 'I']).to.deep.equal(result);
        });
    });

    describe('Order Array', () => {
        it('should sort the below array', () => {
            const data = ['200', '450', '2.5', '1', '505.5', '2'];

            const result = sortNumericStrings(data)

            expect([1, 2, 2.5, 200, 450, 505.5]).to.deep.equal(result);
        });
    });

    describe('Get Diff Array', () => {
        // Implemented inline
        it('should determine array differences', () => {
            const data1 = [1, 2, 3, 4, 5, 6, 7];
            const data2 = [2, 4, 5, 7, 8, 9, 10];

            const notInData1 = _.difference(data2, data1)

            expect([8, 9, 10]).to.deep.equal(notInData1);

            const notInData2 = _.difference(data1, data2)

            expect([1, 3, 6]).to.deep.equal(notInData2);
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

            const distance = greatCircle(place1, place2)
            const formatted = numeral(distance).format('0.00')

            expect(formatted).to.equal('36.91');
        });
    });

    describe('Get Human Time Diff', () => {
        it('should generate a human readable time difference', () => {
            let time1 = '2016-06-05T12:00:00';
            let time2 = '2016-06-05T15:00:00';


            const timeDiff = moment(time1).from(moment(time2))

            expect(timeDiff).to.equal('3 hours ago');
        });
    });
});

