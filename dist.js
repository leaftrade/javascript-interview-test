/*
Unceremoniously taken from: https://en.wikipedia.org/wiki/Haversine_formula

In a real world scenario, I would use a library for this whole thing but I wanted to
write this out because I enjoy math stuff and researched the topic of finding distances
along the surface of the earth a long time ago without actually needing it for anything
at the time.
*/

function toRad(n) {
    return n * Math.PI / 180;
};

function sinSquared(exp) {
    return Math.sin(exp) * Math.sin(exp);
}

function haversineDistance(lat1, lat2, lon1, lon2, radius) {
    let dLat = lat2 - lat1;
    let dLon = lon2 - lon1;

    return 2 * radius * Math.asin(
        Math.sqrt(
            sinSquared(dLat / 2) + Math.cos(lat1) * Math.cos(lat2) * sinSquared(dLon / 2)
        )
    )
};

/*
The distance between two points on a sphere that happens to have the radius of the earth.
*/
module.exports = function dist(lat1, lon1, lat2, lon2) {
    let radius = 3960; // earth's radius in miles (approx)

    if ((lat1 === lat2) && (lon1 === lon2)) {
        return 0;
    } else {
        let radlat1 = toRad(lat1);
        let radlat2 = toRad(lat2);
        let radlon1 = toRad(lon1);
        let radlon2 = toRad(lon2);
        return haversineDistance(radlat1, radlat2, radlon1, radlon2, radius);
    }
}