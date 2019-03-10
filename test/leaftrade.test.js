const expect = require('chai').expect;

describe('Leaftrade Tests', () => {
    describe('Reverse Array', () => {
        it('should turn the below string into an array and reverse the words', () => {
            let data = "I want this job.";
            datamod = data.replace(/\./g, '');
            var arr = datamod.split(' ');
            console.log(arr);
            data = arr.reverse();
            console.log(data);
            expect(['job', 'this', 'want', 'I']).to.deep.equal(data);
        });
    });
    describe('Order Array', () => {
        it('should sort the below array', () => {
            let data = ['200', '450', '2.5', '1', '505.5', '2'];
            dcopy = data.sort();
            var arr = [];
            for(var i =0; i<dcopy.length; i++)
                arr.push(Number(dcopy[i]));
            console.log(arr)
            //data = '"' + arr.join(' "," ') + '"';
            data = arr;
            expect([1, 2, 2.5, 200, 450, 505.5]).to.deep.equal(data);
        });
    });
    describe('Get Diff Array', () => {
        it('should determine array differences', () => {
            let data1 = [1, 2, 3, 4, 5, 6, 7];
            let data2 = [2, 4, 5, 7, 8, 9, 10];

            var arr1 = [];
            var arr2 = [];

            console.log(data1.indexOf(data2[2]));

            /*indexOf returns -1 if the value to search for never occurs.
            * so this is a janky way of using this builtin but it works pretty well*/

            for(var i = 0; i < data1.length; i++){
                if(data2.indexOf(data1[i]) === -1) arr1.push(data1[i]);
            }
            for(var j = 0; j < data2.length; j++){
                if(data1.indexOf(data2[j]) === -1) arr2.push(data2[j]);
            }

            console.log(data1);
            console.log(arr1);
            console.log('');
            console.log(data2);
            console.log(arr2);


            // Code here
            data = arr2;

            expect([8, 9, 10]).to.deep.equal(data);

            // Code here
            data = arr1;
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

            let x1 = place1.lat,
                y1 = place1.lon,
                x2 = place2.lat,
                y2 = place2.lon;

            /* I thought looking for a library function for this somewhere in js.
            * But I'm always worried about losing touch with my academic math, so
            * haversine formula it is.*/

            /**https://en.wikipedia.org/wiki/Haversine_formula**/
            var R = 6372; //km of earth radius
            var delta_x = (x2 - x1) * Math.PI / 180;
            var delta_y = (y2 - y1) * Math.PI / 180;

            var a = Math.pow((Math.sin(delta_x))/2,2) +
                (Math.cos(x1 * (Math.PI / 180)) * Math.cos(x2* (Math.PI / 180)) *
                Math.pow((Math.sin(delta_y))/2,2));

            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

            var d = R * c;  //in kilometers

            var distance_float = Math.round(d* 0.6214 * 100) /100; //in miles

            console.log(distance_float.toString());

            var distance = distance_float.toString()


            expect(distance).to.equal('36.91');
        });
    });
    describe('Get Human Time Diff', () => {
        it('should generate a human readable time difference', () => {
            let time1 = '2016-06-05T12:00:00';
            let time2 = '2016-06-05T15:00:00';

            // Code here
            /**/

            expect(timeDiff).to.equal('3 hours ago');
        });
    });
});
