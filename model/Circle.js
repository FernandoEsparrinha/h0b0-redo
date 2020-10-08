class Circle {

    constructor(position, diameter, index) {
        this.originalX = position[0]
        this.originalY = position[1]

        this.X = windowWidth / 2
        this.Y = windowHeight / 2

        this.pos = new p5.Vector(0, 0)
        this.target = new p5.Vector(lerp(windowWidth / 2, this.originalX, 0.15), lerp(windowHeight / 2, this.originalY, 0.15))

        this.vel = new p5.Vector(0, 0)
        this.velX = 0
        this.velY = 0
        this.spring = 0.66
        this.speed = 0.1

        // circle scale on hover with fake spring motion
        this.targetSize = diameter
        this.initialSize = diameter
        this.finalSize = diameter * 1.2
        this.circleSize = diameter
        this.scaleForce = 0
        this.scaleVelocity = 0
        this.scaleDrag = 0.5
        this.scaleStrength = 0.5

        this.diameter = diameter
        this.index = index

        // color
        this.startFill = 0.3
        this.endFill = 0.6
        this.lerpAmount = 0
        this.hRange = map(this.index * (360 / 17), 0, 360, 160, 360)

        // show/hide circles
        this.lerpGui = 0
    }

    draw() {
        push()
        this.calculateMovement()

        // circle base style is common to any state
        strokeWeight(1.3)
        stroke(this.hRange, 100, 100, 1.0)
        fill(this.hRange, 100, 100, this.startFill)


        if (open) {
            // After Polygon has been opened (click)
            this.handleHovering()

            if (activeGui) {
                // Displays (music) index number over circle
                if (!mobileMode) {
                    textSize(32)
                } else {
                    textSize(18)
                }
                text(this.index, this.X, this.Y)

            } else {
                stroke(0, 0, 0, 0)
                fill(0, 0, 0, 0)
            }
        }

        // Draw a circle after the corresponding music has been loaded
        if (loadIndex >= this.index) {
            circle(this.X, this.Y, this.diameter)
        }
        pop()
    }

    /**
     * Animates hovering action
     */
    handleHovering() {
        if (this.isBeingHovered()) {
            cursor(HAND)
            if (this.lerpAmount <= 1.0) {
                this.lerpAmount += 0.1

                // fake spring motion on hover scaling
                // set target to expanded size
                this.targetSize = this.finalSize
                // calculate spring motion
                this.scaleForce = this.targetSize - this.circleSize;
                this.scaleForce *= this.scaleStrength
                this.scaleVelocity *= this.scaleDrag
                this.scaleVelocity += this.scaleForce
                this.circleSize += this.scaleVelocity
                // output result to diameter
                this.diameter = this.circleSize

                /*
                // fake spring motion
                // the force is the amount of pulling done
                // the strength of the spring reduces the force
                // velocity decreases with the drag amount
                // velocity and force work together
                // for every frame the velocity affects our spring
                */
            }

            fill(this.hRange, 100, 100, lerp(this.startFill, this.endFill, this.lerpAmount))

            if (this.isPlaying()) {
                stroke(0, 0, 100, 1.0)
                fill(0, 0, 100, lerp(this.startFill, this.endFill, this.lerpAmount))
            }
        } else {
            if (this.lerpAmount > 0.0) {
                this.lerpAmount -= 0.04

                // fake spring motion on !hover scaling
                this.targetSize = this.initialSize
                this.scaleForce = this.targetSize - this.circleSize;
                this.scaleForce *= this.scaleStrength
                this.scaleVelocity *= this.scaleDrag
                this.scaleVelocity += this.scaleForce
                this.circleSize += this.scaleVelocity
                this.diameter = this.circleSize
            }

            fill(this.hRange, 100, 100, lerp(this.startFill, this.endFill, this.lerpAmount))

            if (this.isPlaying()) {
                stroke(0, 0, 100, 1.0)
                fill(0, 0, 100, lerp(this.startFill, this.endFill, this.lerpAmount))
            }
        }
    }

    /**
     * Return if the circle is being hovered by the mouse
     */
    isBeingHovered() {
        return (dist(mouseX, mouseY, this.X, this.Y) < (this.diameter / 2))
    }

    /**
     * Return if the circle is the one being played or not
     */
    isPlaying() {
        return this.index == musicController.getTrackNumberPlaying()
    }

    /**
     * Change circle target, start movement towards that point
     * 
     * @param {[x,y]} position Proxima posicao do circulo 
     */
    setPosition(position) {
        this.target.set(position[0], position[1])
    }

    /**
     * Calculate the circle's next poisition, based on the values of target, spring and speed
     */
    calculateMovement() {
        this.pos.set(this.X, this.Y);
        this.vel.set(this.velX, this.velY);
        this.vel.mult(this.spring);

        var diff = p5.Vector.sub(this.target, this.pos);
        diff.mult(this.speed);
        this.vel.add(diff);
        this.pos.add(this.vel);

        this.X = this.pos.x;
        this.Y = this.pos.y;

        this.velX = this.vel.x;
        this.velY = this.vel.y;
    }
}