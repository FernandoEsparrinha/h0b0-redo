class Polygon {
    constructor(polygonRadius, circleDiameter, n) {
        this.vertices = []

        createVerticesPosition(polygonRadius, n)
        for (let i = 0; i < n; i++) {
            this.vertices[i] = new Circle(verticesPosition[i], circleDiameter, i)
        }
    }

    draw() {
        for (let i = 0; i < 17; i++) {
            this.vertices[i].draw()
        }
    }

    refreshPositions() {
        let x = 0;
        for (let i = 0; i < 17; i++) {
            if ((i - musicController.getTrackNumberPlaying()) < 0) {
                x = 17 + (i - musicController.getTrackNumberPlaying())
            } else {
                x = (i - musicController.getTrackNumberPlaying())
            }
            this.vertices[i].setPosition(verticesPosition[x])
        }
    }

}
