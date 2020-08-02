function createVerticesPosition(n, radius) {
    let angle = TWO_PI / n
    let index = 0
    for (let a = (PI / 2); a < (TWO_PI + (PI / 2)); a += angle) {
        let sx = (windowWidth / 2) + cos(a) * radius
        let sy = (windowHeight / 2) + sin(a) * radius

        verticesPosition[index] = [sx, sy]
        index++
    }
}