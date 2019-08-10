const dayjs = require('dayjs');

const dist = require('./dist');
const humanize = require('./humanize');

module.exports = {
  /*
  You don't really need a function for these but if it's repeated, hey why not
  save yourself the headache of writing it over and over again.
   */
  reverseArray(s) {
    return s.replace('.', '').split(' ').reverse();
  },
  orderArray(inputArray) {
    return inputArray.map(s => Number(s)).sort((a, b) => a < b ? -1 : 1)
  },
  getDiffArray(a1, a2) {
    let set = new Set(a1)
    return a2.filter(n => !set.has(n))
  },
  /*
  Now things are getting interesting. These two would probably be handled by libraries.
   */
  getDistance(p1, p2) {
    /*
    This provides an adapter for the objects presented in the spec
    so the implementation can change independently.

    Fun fact: I used multiple implementations and this one was closest to the
    spec but still came out with a rounding error thus the sinful use of `.toFixed(3)`
    and then truncating the last character of the string.
    
    Ideally the assertion would have a tolerance for the exact answer because floating point arithmetic
    could lead to accuracy issues depending on the application.
    */
    let distInMiles = dist(+p1.lat, +p1.lon, +p2.lat, +p2.lon);
    return String(distInMiles.toFixed(3)).slice(0, -1);
  },
  getHumanTimeDiff(start, end) {
    /*
    I have another adapter here, mostly to contain the business logic of keeping
    things above 24 hours out of the code that can't handle it properly. I think
    it's within the scope of library to do the parsing for us but then we would
    have to duplicate it for the business logic.

    Since the spec if only concerned with time deltas in hours, I don't worry
    about anything larger. There is a sort of tombstone (like with method
    deprecation) for units above hours so if we hit that ceiling it's obvious.

    Again, I would normally use a library for time humanization but this is fun.
    */
    start = dayjs(start)
    end = dayjs(end)

    let seconds = end.diff(start, 'second')
    let hours = seconds / 3600

    if (Math.abs(hours) > 24) {
      throw new Error("I can't go above hours (yet)");
    }

    return humanize(seconds);
  }
};