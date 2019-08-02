const expect = require('chai').expect;

const reverseArray = (data) => {
    // .replace: Removes the periods and commas.
    // .split: Split the sentence in to an array of words so it can be sorted
    // .reverse: reverses the order of the array of words
    const reversedArray = data.replace('.','').replace(',','').split(' ').reverse()
    console.log(reversedArray)
    return reversedArray
}

const orderArray = (data) => {
    // Convert each string in the array to a float
    // Sort the array of floats and return
    const orderedArray = data.map(i => parseFloat(i)).sort()
    console.log(orderedArray)
    return orderedArray
}

const getDiffArray = (arr1, arr2, index) => {
    // Similar to a Venn Diagram
    // (Center) index of 0 returns elements shared by arr1 and 2
    // (Left) index of 1 returns all elements only found in arr1    
    // (Right) index of 2 returns elements only found in arr2
    let output
    if (index === 0) output = arr1.filter(i => arr2.indexOf(i) >= 0)
    else if (index === 1) output = arr1.filter(i => arr2.indexOf(i) === -1)    
    else if (index === 2) output = arr2.filter(i => arr1.indexOf(i) === -1)
    else throw Error("index must be between 0 and 2")
    console.log(output)
    return output
}

const getDistance = (place1, place2) => {
    // Leveraged geodist npm package for this function
    // https://www.npmjs.com/package/geodist
    const geodist = require('geodist')     
    const distance =  (Math.floor(geodist(place1, place2, {exact: true}) * 100) / 100).toString()        
    console.log(distance)
    return distance
}

const getHumanTimeDiff = (time1, time2) => {

    // time difference in milliseconds
    const timeDiffRaw = new Date(time2) - new Date(time1)
    let timeDiff = Math.abs(new Date(time2) - new Date(time1))

    const dayMillis = 1000 * 60 * 60 * 24
    const hourMillis = 1000 * 60 * 60
    const minMillis = 1000 * 60
    const secMillis = 1000

    // calculate full day difference
    const dayDiff = Math.floor(timeDiff / dayMillis)    
    // Subtract full days (in miliseconds) from timeDiff
    timeDiff -= dayDiff * dayMillis

    // caclulate full hour difference
    const hourDiff = Math.floor(timeDiff / hourMillis)    
    // Subtract full hours (in miliseconds) from timeDiff
    timeDiff -= hourDiff * hourMillis

    // caclulate full min difference
    const minDiff = Math.floor(timeDiff / minMillis)    
    // Subtract full minutes (in miliseconds) from timeDiff
    timeDiff -= minDiff * minMillis

    // caclulate full second difference
    const secDiff = Math.floor(timeDiff / secMillis)    
    // Subtract full seconds (in miliseconds) from timeDiff
    timeDiff -= secDiff * secMillis  
    
    // TimeUnits is an array to store time unit sentence fragments.
    // If a time unit equals 1, add singular fragment.
    // If a time unit is greater than 1 add plural fragment.
    let timeUnits = []
    if (dayDiff == 1) timeUnits.push(`${dayDiff} day`)
    if (hourDiff == 1) timeUnits.push(`${hourDiff} hour`)
    if (minDiff == 1) timeUnits.push(`${minDiff} minute`)
    if (secDiff == 1) timeUnits.push(`${secDiff} second`)
    if (dayDiff > 1) timeUnits.push(`${dayDiff} days`)
    if (hourDiff > 1) timeUnits.push(`${hourDiff} hours`)
    if (minDiff > 1) timeUnits.push(`${minDiff} minutes`)
    if (secDiff > 1) timeUnits.push(`${secDiff} seconds`)

    // If time2 is after time1, it is reported as 'x time units ago'
    // If time2 is before time1, it is reported as 'x time units from now'
    let humanTimeDiff
    if (timeDiffRaw > 0) {
        humanTimeDiff = timeUnits.join(', ') + ' ago'
    } else if (timeDiffRaw < 0) {
        humanTimeDiff = timeUnits.join(', ') + ' from now'
    } else {
        humanTimeDiff = 'the datetime stamps entered are equal'
    }
    console.log(humanTimeDiff)
    return humanTimeDiff    
}

describe('Leaftrade Tests', () => {
    describe('Reverse Array', () => {
        it('should turn the below string into an array and reverse the words', () => {
            let data = "I want this job.";
            data = reverseArray(data)
            expect(['job', 'this', 'want', 'I']).to.deep.equal(data);

            // Test multi sentence with period.
            let data1 = "I love pizza. I love pasta";
            data1 = reverseArray(data1)
            expect(['pasta', 'love', 'I', 'pizza', 'love', 'I']).to.deep.equal(data1);  
            
            // Test sentence with comma
            let data2 = "Whisper words of wisdom, let it be";
            data2 = reverseArray(data2)
            expect(['be', 'it', 'let', 'wisdom', 'of', 'words', 'Whisper']).to.deep.equal(data2);              
        });
    });
    describe('Order Array', () => {
        it('should sort the below array', () => {
            let data = ['200', '450', '2.5', '1', '505.5', '2'];

            data = orderArray(data)

            expect([1, 2, 2.5, 200, 450, 505.5]).to.deep.equal(data);
        });
    });
    describe('Get Diff Array', () => {
        it('should determine array differences', () => {
            let data1 = [1, 2, 3, 4, 5, 6, 7];
            let data2 = [2, 4, 5, 7, 8, 9, 10];

            const right = getDiffArray(data1, data2, 2)
            expect([8, 9, 10]).to.deep.equal(right);

            const left = getDiffArray(data1, data2, 1)
            expect([1, 3, 6]).to.deep.equal(left);

            const center = getDiffArray(data1, data2, 0)
            expect([2, 4, 5, 7, ]).to.deep.equal(center);
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

            const distance = getDistance(place1, place2)

            expect(distance).to.equal('36.91');
        });
    });
    describe('Get Human Time Diff', () => {
        it('should generate a human readable time difference', () => {
            const time1 = '2016-06-05T12:00:00';
            const time2 = '2016-06-05T15:00:00';
            const timeDiffA = getHumanTimeDiff(time1, time2)
            expect(timeDiffA).to.equal('3 hours ago');

            // Future time case
            const time3 = '2016-06-05T15:00:00';
            const time4 = '2016-06-05T12:00:00'; 
            const timeDiffB = getHumanTimeDiff(time3, time4)
            expect(timeDiffB).to.equal('3 hours from now');
            
            // Equal datetime test case
            const time5 = '2019-06-05T12:00:00'; 
            const timeDiffC = getHumanTimeDiff(time5, time5)
            expect(timeDiffC).to.equal('the datetime stamps entered are equal');

            // Complex test case
            const myBirthday = '1989-12-12T05:41:15'
            const time6 = '2019-08-01T12:00:00';
            const timeDiffD = getHumanTimeDiff(myBirthday, time6)
            expect(timeDiffD).to.equal('10824 days, 5 hours, 18 minutes, 45 seconds ago');
        });
    });
});
