class Polygon {
    constructor(x, y, radius, n) {
        this.vertices = []
        this.activeTrack = 0

        let angle = TWO_PI / n;
        for (let a = 0; a < TWO_PI; a += angle) {
            let index = Math.round(a / (TWO_PI / n))
            let sx = x + cos(a) * radius
            let sy = y + sin(a) * radius

            this.vertices[index] = new Circle(sx, sy, radius / 5, index == 0);
        }
    }

    draw() {
        translate(windowWidth / 2, windowHeight / 2)
        rotate((PI / 2) + ((TWO_PI / 18) * this.activeTrack))

        for (let i = 0; i < 18; i++) {
            this.vertices[i].draw();
        }

    }

    next() {
        this.activeTrack++
    }

    previous() {
        this.activeTrack--
    }
}
