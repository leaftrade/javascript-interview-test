const reverseArray = (inputString) => {
    // Remove special characters, split on space, return reversed array.
    return inputString.replace(/[^a-zA-Z0-9 ]/g, "").split(" ").reverse();
};

const orderArray = (inputArray) => {
    // Cast each element to a Number, return ascending ordered array
    return inputArray.map(Number).sort();
};

const getDiffArray = (inputArray1, inputArray2) => {
    // Return an array of elements that are present in inputArray1, but not inputArray2
    return inputArray1.filter(n => !inputArray2.includes(n))
};

const degreeToRadian = (degree) => {
    return degree * (Math.PI / 180)
};

// Use geolib or geodist in more complex/production situations
const getAproxDistance = (lat1, lon1, lat2, lon2) => {
    // Return distance of 2 geo points in miles, using the Haversine formula, rounded 2 decimal places
    // https://en.wikipedia.org/wiki/Haversine_formula

    let earthRadius = 3959; // Aprox. radius in miles
    let dLat = degreeToRadian(lat2 - lat1);
    let dLon = degreeToRadian(lon2 - lon1);
    let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(degreeToRadian(lat1)) * Math.cos(degreeToRadian(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return (earthRadius * c).toFixed(2);
};

// Use moment.js or something similar in more complex/production situations, so as not to reinvent the wheel.
// Only deterrent is moment.js is a very large package
const getTimeDiff = (time1, time2) => {
    // Return a human-readable time difference.
    // If time1 > time2, then the difference is considered "...from now"
    // If time1 < time2, then the difference is considered "...ago"
    let date1 = new Date(time1);
    let date2 = new Date(time2);
    let millisecondsDiff = date1 - date2;
    let suffix = 'Times are equal';

    if (millisecondsDiff > 0) {
        suffix = 'ago';
    } else if (millisecondsDiff < 0) {
        suffix = 'from now';
        millisecondsDiff = Math.abs(millisecondsDiff);
    } else {
        return suffix
    }
    millisecondsDiff = Math.abs(millisecondsDiff);

    const secondMS = 1000;
    const minuteMS = 60 * secondMS;
    const hourMS = 60 * minuteMS;
    const dayMS = 60 * hourMS;

    let readableTime = '';

    let days = Math.round(millisecondsDiff / dayMS);
    if (days > 0) {
        millisecondsDiff -= days * dayMS;
        readableTime += `${days} days `;
    }
    let hours = Math.round(millisecondsDiff / hourMS);
    if (hours > 0) {
        millisecondsDiff -= hours * hourMS;
        readableTime += `${hours} hours `;
    }
    let minutes = Math.round(millisecondsDiff / minuteMS);
    if (minutes > 0) {
        millisecondsDiff -= minutes * minuteMS;
        readableTime += `${minutes} minutes `;
    }
    let seconds = Math.round(millisecondsDiff / secondMS);
    if (seconds > 0) {
        millisecondsDiff -= seconds * secondMS;
        readableTime += `${seconds} seconds `;
    }
    if (millisecondsDiff > 0) {
        readableTime += `${millisecondsDiff} milliseconds `;
    }

    readableTime += suffix;
    return readableTime;
};

module.exports = {
    reverseArray,
    orderArray,
    getDiffArray,
    getAproxDistance,
    getTimeDiff
};