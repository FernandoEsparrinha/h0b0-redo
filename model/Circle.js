class Circle {

    constructor(x, y, radius, isActive) {
        this.X = x;
        this.Y = y;
        this.radius = radius;
        this.isActive = isActive;
    }

    draw() {
        push()
        if (this.isActive) {
            stroke('teal');
        } else {
            stroke('red')
        }
        circle(this.X, this.Y, this.radius);
        pop()
    }
}
