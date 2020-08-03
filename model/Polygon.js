class Polygon {
    constructor(radius, n) {
        this.vertices = []

        createVerticesPosition(n, radius)
        for (let i = 0; i < n; i++) {
            this.vertices[i] = new Circle(verticesPosition[i], radius / 5, i)
        }
    }

    draw() {
        for (let i = 0; i < 18; i++) {
            this.vertices[i].draw()
        }
    }

    refreshPositions() {
        let x = 0;
        for (let i = 0; i < 18; i++) {
            if ((i - musicController.getTrackNumberPlaying()) < 0) {
                x = 18 + (i - musicController.getTrackNumberPlaying())
            } else {
                x = (i - musicController.getTrackNumberPlaying())
            }
            this.vertices[i].setPosition(verticesPosition[x])
        }
    }

}
