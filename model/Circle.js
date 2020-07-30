class Circle {

    constructor(x, y, diameter, index) {
        this.X = x
        this.Y = y
        this.diameter = diameter
        this.index = index
    }

    draw() {
        push()
        let isPlaying = this.index == musicController.getTrackNumberPlaying()
        if (isPlaying) {
            stroke('white');
        } else {
            colorMode(HSB)
            let h = this.index * (360 / 18)
            stroke(h, 100, 100)
        }
        circle(this.X, this.Y, this.diameter)
        text(this.index, this.X, this.Y)
        pop()
    }
}


