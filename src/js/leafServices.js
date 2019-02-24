var geolib = require('geolib');

const milesCoefficient = 0.621371;
module.exports = class LeafServices {


  constructor() {
  }

  splitAndReverse(str) {
    return str.split(' ').reverse();
  }

  sortStringArray(strArr){
    return strArr.map(function(v) {
      return parseFloat(v);
    }).sort(function(a,b) {
        return a - b;
    });
  }

  findArrDiff(a, b){
    return b.filter(function(i) {return a.indexOf(i) < 0;})
  }

  haversineFunction(p1, p2){
    var R = 6372; // Radius of the earth in km
    var dLat = this.convertToRadians(p2.lat-p1.lat);
    var dLon = this.convertToRadians(p2.lon-p1.lon);
    var lat1Rads = this.convertToRadians(p1.lat);
    var lat2Rads = this.convertToRadians(p2.lat);
    var a = Math.pow(Math.sin(dLat/2),2) +  Math.cos(lat1Rads) * Math.cos(lat2Rads) * Math.pow(Math.sin(dLon/2),2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var distanceInKm = R * c; // Distance in km
    var distanceInMiles = distanceInKm * milesCoefficient;
    return distanceInMiles.toFixed(2);
  }

  convertToRadians(degrees){
    return degrees * (Math.PI/180)
  }
}
