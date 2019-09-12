const expect = require("chai").expect;

describe("Leaftrade Tests", () => {
  describe("Reverse Array", () => {
    it("should turn the below string into an array and reverse the words", () => {
      let data = "I want this job.";

      data = data
        .split(/[\s\W]/)
        .filter(x => x.length > 0)
        .reverse();

      expect(["job", "this", "want", "I"]).to.deep.equal(data);
    });
  });
  describe("Order Array", () => {
    it("should sort the below array", () => {
      let data = ["200", "450", "2.5", "1", "505.5", "2"];

      // Yes, sort() is in-place but it also returns the now-sorted array (of
      // floats); handy.

      data = data.map(parseFloat).sort();

      expect([1, 2, 2.5, 200, 450, 505.5]).to.deep.equal(data);
    });
  });
  describe("Get Diff Array", () => {
    it("should determine array differences", () => {
      let data1 = [1, 2, 3, 4, 5, 6, 7];
      let data2 = [2, 4, 5, 7, 8, 9, 10];

      let set1 = new Set(data1);
      let set2 = new Set(data2);

      let data = new Set();

      for (let x of data2) {
        if (!set1.has(x)) data.add(x);
      }

      data = Array.from(data);

      expect([8, 9, 10]).to.deep.equal(data);

      data = new Set();

      for (let x of data1) {
        if (!set2.has(x)) data.add(x);
      }

      data = Array.from(data);

      expect([1, 3, 6]).to.deep.equal(data);
    });
  });
  describe("Get Distance", () => {
    it("should get the distance between two geo points", () => {
      let place1 = {
        lat: "41.9641684",
        lon: "-87.6859726"
      };
      let place2 = {
        lat: "42.1820210",
        lon: "-88.3429465"
      };

      // While the formula is simple, this seems like a good place
      // to use a third-party package do the dirty work.
      // I've scoped the use of the geodist package to just this test.

      const geodist = require("geodist");

      let distance = geodist(place1, place2, { exact: true });

      // Note: the actual answer is 36.91514857267145
      // but the existing test wants a string with 2 digits of precision
      // without rounding it seems.
      //
      // Normally, one uses .toFixed(2) on the float but
      // that would round to 36.92.  Thus, while it seems
      // inaccurate to *not* round, I here convert to string and
      // take the first 2 digits verbatim.

      distance = String(distance).replace(/^(\d+\.\d{2})\d+$/, "$1");

      expect(distance).to.equal("36.91");
    });
  });
  describe("Get Human Time Diff", () => {
    it("should generate a human readable time difference", () => {
      let time1 = "2016-06-05T12:00:00";
      let time2 = "2016-06-05T15:00:00";

      // Code here

      expect(timeDiff).to.equal("3 hours ago");
    });
  });
});
