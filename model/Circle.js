class Circle {

    constructor(x, y, radius, index) {
        this.X = x
        this.Y = y
        this.radius = radius
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
        circle(this.X, this.Y, this.radius)
        text(this.index, this.X, this.Y)
        pop()
    }
}


