class Util {
    static reverseArray (data) {
        // .replace: Removes the periods and commas.
        // .split: Split the sentence in to an array of words so it can be sorted
        // .reverse: reverses the order of the array of words
        const reversedArray = data.replace('.', '').replace(',', '').split(' ').reverse();
        console.log(reversedArray);
        return reversedArray
    }

    static orderArray (data) {
        // Convert each string in the array to a float
        // Sort the array of floats and return
        const orderedArray = data.map(i => parseFloat(i)).sort();
        console.log(orderedArray);
        return orderedArray
    }

    static getDiffArray (arr1, arr2, index) {
        // Similar to a Venn Diagram
        // (Center) index of 0 returns elements shared by arr1 and 2
        // (Left) index of 1 returns all elements only found in arr1    
        // (Right) index of 2 returns elements only found in arr2
        let output;
        if (index === 0) output = arr1.filter(i => arr2.indexOf(i) >= 0);
        else if (index === 1) output = arr1.filter(i => arr2.indexOf(i) === -1);
        else if (index === 2) output = arr2.filter(i => arr1.indexOf(i) === -1);
        else throw Error('index must be between 0 and 2');
        console.log(output);
        return output
    }

    static getDistance (place1, place2) {
        // Leveraged geodist npm package for this function
        // https://www.npmjs.com/package/geodist
        const geodist = require('geodist');
        const distance = (Math.floor(geodist(place1, place2, {exact: true}) * 100) / 100).toString();
        console.log(distance);
        return distance
    }

    static getHumanTimeDiff (time1, time2) {
        // time difference in Seconds
        const timeDiffRaw = new Date(time2) - new Date(time1);
        let timeDiffSeconds = Math.abs(timeDiffRaw) / 1000;

        const daySeconds = 60 * 60 * 24;
        const hourSeconds = 60 * 60;
        const minSeconds = 60;
        const secSeconds = 1;

        // calculate full day difference
        const dayDiff = Math.floor(timeDiffSeconds / daySeconds);
        // Subtract full days (in miliseconds) from timeDiff
        timeDiffSeconds -= dayDiff * daySeconds;

        // caclulate full hour difference
        const hourDiff = Math.floor(timeDiffSeconds / hourSeconds);
        // Subtract full hours (in miliseconds) from timeDiffSeconds
        timeDiffSeconds -= hourDiff * hourSeconds;

        // caclulate full min difference
        const minDiff = Math.floor(timeDiffSeconds / minSeconds);
        // Subtract full minutes (in miliseconds) from timeDiffSeconds
        timeDiffSeconds -= minDiff * minSeconds;

        // caclulate full second difference
        const secDiff = Math.floor(timeDiffSeconds / secSeconds);
        // Subtract full seconds (in miliseconds) from timeDiffSeconds
        timeDiffSeconds -= secDiff * secSeconds;

        // TimeUnits is an array to store time unit sentence fragments.
        // If a time unit equals 1, add singular fragment.
        // If a time unit is greater than 1 add plural fragment.
        let timeUnits = [];
        if (dayDiff == 1) timeUnits.push(`${dayDiff} day`);
        if (hourDiff == 1) timeUnits.push(`${hourDiff} hour`);
        if (minDiff == 1) timeUnits.push(`${minDiff} minute`);
        if (secDiff == 1) timeUnits.push(`${secDiff} second`);
        if (dayDiff > 1) timeUnits.push(`${dayDiff} days`);
        if (hourDiff > 1) timeUnits.push(`${hourDiff} hours`);
        if (minDiff > 1) timeUnits.push(`${minDiff} minutes`);
        if (secDiff > 1) timeUnits.push(`${secDiff} seconds`);

        // If time2 is after time1, it is reported as 'x time units ago'
        // If time2 is before time1, it is reported as 'x time units from now'
        let humanTimeDiff;
        if (timeDiffRaw > 0) {
        humanTimeDiff = timeUnits.join(', ') + ' ago';
        } else if (timeDiffRaw < 0) {
        humanTimeDiff = timeUnits.join(', ') + ' from now';
        } else {
        humanTimeDiff = 'the datetime stamps entered are equal';
        }
        console.log(humanTimeDiff);
        return humanTimeDiff
    }
}

module.exports = Util
