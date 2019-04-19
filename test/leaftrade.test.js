const expect = require('chai').expect;


function reverseWords(someString) {
    // splits the string on spaces and various punctuation
    return someString.split(/[ ,.?!]+/).filter((el) => {
        // remove empty strings matched from the regex
        return el !== "";
    }).reverse();
}

/**
 * Returns all elements in array A that are not in array B
 */
function diff(a, b){
    // iterate over elements in array a, return element only if it isn't in b
    return a.filter((el) => {
        return b.indexOf(el) < 0;
    });
}


 /**
 * I wrote this originally. It looks like Geolib used a different formula than the test writer or it .
 * I tried to get it to match the test case value exactly but it was always off by a few hundreths.
 * /

/** 
 * Gives the distance between geo points. Value returned in miles by default. 
 * Can pass "km" (kilos) and "m" (meters) as the 3rd argument to convert to different units
*/
function geoDistance(place1, place2, unit='mi'){
    const geolib = require('geolib');
    let distance = geolib.getDistance(
        {latitude: place1.lat, longitude: place1.lon},
        {latitude: place2.lat, longitude: place2.lon},
    );
    return geolib.convertUnit(unit, distance, 4); 
}

/* 
Found this formula online and it ended up matching the the test case value. 
*/
function getDistance(place1, place2) {
    const R = 6371; // Radius of the earth in km
    const latDegreees = deg2rad(place2.lat-place1.lat);
    const lonDegrees = deg2rad(place2.lon-place1.lon); 
    const a = 
        Math.sin(latDegreees/2) * Math.sin(latDegreees/2) +
        Math.cos(deg2rad(place1.lat)) * Math.cos(deg2rad(place2.lat)) * 
        Math.sin(lonDegrees/2) * Math.sin(lonDegrees/2); 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    // distance in kilos
    const distance = R * c; 
    return Math.round(distance* 0.6214 * 100) /100; 
}

function deg2rad(deg) {
    return deg * (Math.PI/180);
}


describe('Leaftrade Tests', () => {
    describe('Reverse Array', () => {
        it('should turn the below string into an array and reverse the words', () => {
            let data = "I want this job.";

            // Code here
            data = reverseWords(data);
            expect(['job', 'this', 'want', 'I']).to.deep.equal(data);
        });
    });
    describe('Order Array', () => {
        it('should sort the below array', () => {
            let data = ['200', '450', '2.5', '1', '505.5', '2'];

            // I don't think you need a helper function here. 
            // map() and sort() are both part of the standard library and pretty straight forward.

            // Code here
            // cast each array element to Number type, then sort it
            data = data.map(Number).sort();
            expect([1, 2, 2.5, 200, 450, 505.5]).to.deep.equal(data);
        });
    });
    describe('Get Diff Array', () => {
        it('should determine array differences', () => {
            let data1 = [1, 2, 3, 4, 5, 6, 7];
            let data2 = [2, 4, 5, 7, 8, 9, 10];

            
            // Code here
            data = diff(data2, data1);

            expect([8, 9, 10]).to.deep.equal(data);

            // Code here
            data = diff(data1, data2);

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
            let distance = getDistance(place1, place2).toString();
            
            expect(distance).to.equal('36.91');
        });
    });
    describe('Get Human Time Diff', () => {
        it('should generate a human readable time difference', () => {
            let time1 = '2016-06-05T12:00:00';
            let time2 = '2016-06-05T15:00:00';

            // I didn't think this needed a helper because it's a function from a library
            // Maybe if more formatting was needed you could wrap it in another function
            
            // Code here
            const moment = require('moment');
            let timeDiff = moment(time1).from(moment(time2));
            
            expect(timeDiff).to.equal('3 hours ago');
        });
    });
});
