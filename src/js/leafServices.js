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
}
