class Circle {

    constructor(position, diameter, index) {
        this.X = position[0]
        this.Y = position[1]
        this.diameter = diameter
        this.index = index
    }

    draw() {
        let isPlaying = this.index == musicController.getTrackNumberPlaying()
        if (isPlaying) {
            stroke(0, 0, 100)
        } else {
            let h = this.index * (360 / 18)
            stroke(h, 100, 100)
        }

        circle(this.X, this.Y, this.diameter)

        push()
        text(this.index, this.X, this.Y)
        pop()
    }

    setPosition(position) {
        this.X = position[0]
        this.Y = position[1]
    }
}


