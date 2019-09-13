const moment = require("moment");
moment().format();


function reverseArray(string) {
    // replace all punctuation in a string and return an array in reverse order.
    return string.replace(/[^A-Za-z0-9\s]/g,"").split(" ").reverse();
};

function orderArray(arr1) {
    // order an array by numberical value.
    return arr1.sort(function(a, b){return a - b}).map(Number);
};

function diffArray(removables_arr, arr) {
    // return the difference between arrays aka remove values in first array from
    return arr.filter(word=>!removables_arr.includes(word));
};


function haversineDistanceMiles(coords1, coords2) {
    // return the haversine distance between two coordinates in miles. In a perfect world this
    // utlity would be separate from array operations.
    // Good explanation of the arithmetic here https://community.esri.com/groups/coordinate-reference-systems/blog/2017/10/05/haversine-formula
    // Due to the significant figures in our radius of the earth we can only supply that many in our result.

    function toRad(x) {
        return x * Math.PI / 180;
    }

    const R = 3959; // Using IUGG, https://en.wikipedia.org/wiki/Earth_radius

    var x1 = coords2.lat - coords1.lat;
    var dLat = toRad(x1);
    var x2 = coords2.lon - coords1.lon;
    var dLon = toRad(x2)
    var a = (Math.sin(dLat / 2))**2 +
             Math.cos(toRad(coords1.lat)) * Math.cos(toRad(coords2.lat)) *
            (Math.sin(dLon / 2))**2;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;

    return d.toPrecision(4); // Need to round to 4 significant figures due to R value.
};

function timeDeltaHuman(time_1, time_2) {
    // calculate time delta from time_2 to time_1 using moment
    // return in human readable format
    var a = moment(time_1);
    var b = moment(time_2);

    return b.to(a)
};


module.exports = {
    reverseArray,
    orderArray,
    diffArray,
    haversineDistanceMiles,
    timeDeltaHuman
}