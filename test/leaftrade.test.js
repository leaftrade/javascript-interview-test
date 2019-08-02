const expect = require('chai').expect;

const Util = require('../src/util.js');

describe('Leaftrade Tests', () => {
    describe('Reverse Array', () => {
        it('should turn the below string into an array and reverse the words', () => {
            let data = "I want this job.";
            data = Util.reverseArray(data);
            expect(['job', 'this', 'want', 'I']).to.deep.equal(data);

            // Test multi sentence with period.
            let data1 = 'I love pizza. I love pasta';
            data1 = Util.reverseArray(data1);
            expect(['pasta', 'love', 'I', 'pizza', 'love', 'I']).to.deep.equal(data1);

            // Test sentence with comma
            let data2 = 'Whisper words of wisdom, let it be';
            data2 = Util.reverseArray(data2);
            expect(['be', 'it', 'let', 'wisdom', 'of', 'words', 'Whisper']).to.deep.equal(data2);
        });
    });
    describe('Order Array', () => {
        it('should sort the below array', () => {
            let data = ['200', '450', '2.5', '1', '505.5', '2'];

            data = Util.orderArray(data);

            expect([1, 2, 2.5, 200, 450, 505.5]).to.deep.equal(data);
        });
    });
    describe('Get Diff Array', () => {
        it('should determine array differences', () => {
            let data1 = [1, 2, 3, 4, 5, 6, 7];
            let data2 = [2, 4, 5, 7, 8, 9, 10];

            const vennRight = Util.getDiffArray(data1, data2, 2);
            expect([8, 9, 10]).to.deep.equal(vennRight);

            const vennLeft = Util.getDiffArray(data1, data2, 1);
            expect([1, 3, 6]).to.deep.equal(vennLeft);

            const vennCenter = Util.getDiffArray(data1, data2, 0);
            expect([2, 4, 5, 7 ]).to.deep.equal(vennCenter);
        });
    });
    describe('Get Distance', () => {
        it('should get the distance between two geo points', () => {
            let place1 = {
                lat: '41.9641684',
                lon: '-87.6859726'
            };
            let place2 = {
                lat: '42.1820210',
                lon: '-88.3429465'
            };

            const distance = Util.getDistance(place1, place2);

            expect(distance).to.equal('36.91');
        });
    });
    describe('Get Human Time Diff', () => {
        it('should generate a human readable time difference', () => {
            const time1 = '2016-06-05T12:00:00';
            const time2 = '2016-06-05T15:00:00';
            const timeDiffA = Util.getHumanTimeDiff(time1, time2);
            expect(timeDiffA).to.equal('3 hours ago');

            // Future time case
            const time3 = '2016-06-05T15:00:00';
            const time4 = '2016-06-05T12:00:00';
            const timeDiffB = Util.getHumanTimeDiff(time3, time4);
            expect(timeDiffB).to.equal('3 hours from now');

            // Equal datetime test case
            const time5 = '2019-06-05T12:00:00';
            const timeDiffC = Util.getHumanTimeDiff(time5, time5);
            expect(timeDiffC).to.equal('the datetime stamps entered are equal');

            // Complex test case
            const myBirthday = '1989-12-12T05:41:15';
            const time6 = '2019-08-01T12:00:00';
            const timeDiffD = Util.getHumanTimeDiff(myBirthday, time6);
            expect(timeDiffD).to.equal('10824 days, 5 hours, 18 minutes, 45 seconds ago');
        });
    });
});
