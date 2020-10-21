/**
 * Create an array with the vertex positions of a n-sided polygon
 * 
 * @param {Number} n Number of sides of the polygon
 * @param {Number} radius Radius of the polygon 
 */
function createVerticesPosition(radius, n) {
    let angle = TWO_PI / n
    let index = 0
    for (let a = (TWO_PI + (PI / 2)); a >= (PI / 2); a -= angle) {
        let sx = (windowWidth / 2) + cos(a) * radius
        let sy = (windowHeight * (mobileMode ? 0.36 : 0.5)) + sin(a) * radius

        verticesPosition[index] = [sx, sy]
        index++
    }
}

function enableNoSleep() {
    noSleep.enable();
    document.removeEventListener('touchstart', enableNoSleep, false);
}