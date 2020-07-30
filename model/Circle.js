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
            stroke('teal');
        } else {
            stroke('red')
        }
        circle(this.X, this.Y, this.diameter)
        text(this.index, this.X, this.Y)
        pop()
    }
}


