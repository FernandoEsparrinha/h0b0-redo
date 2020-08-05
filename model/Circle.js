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
        this.spring = 0.20
        this.speed = 0.05

        this.diameter = diameter
        this.index = index

        this.lerpAmount = 0
        this.hRange = map(this.index * (360 / 18), 0, 360, 150, 300)
    }

    draw() {
        push()
        this.calculateMovement()

        if (!open) {
            // When Polygon is still closed
            stroke(this.hRange, 100, 100)
            fill(this.hRange, 100, 100, 0.1)
        } else {
            // After Polygon has been opened (click)

            this.handlePlaying()
            this.handleHovering()


            text(this.index, this.X, this.Y)
        }

        // Só desenha o circulo depois da musica correspondente ter sido carregada
        if (loadIndex >= this.index) {
            circle(this.X, this.Y, this.diameter)
        }
        pop()
    }

    /**
     * Animates the playing circle
     */
    handlePlaying() {
        if (this.isPlaying()) {
            stroke(0, 0, 100)
            fill(0, 0, 100, 0.1)
        } else {
            stroke(this.hRange, 100, 100)
        }
    }

    /**
     * Animates hovering action
     */
    handleHovering() {
        if (this.isBeingHovered()) {
            if (this.lerpAmount <= 1.0) {
                this.lerpAmount += 0.06
            }
            fill(this.hRange, 100, 100, lerp(0.1, 0.5, this.lerpAmount))
            stroke(this.hRange, 100, lerp(0.1, 0.5, this.lerpAmount))

            if (this.isPlaying()) {
                fill(0, 0, 100, 0.5)
            }
        }

        if (!this.isBeingHovered() && this.lerpAmount > 0.0) {
            this.lerpAmount -= 0.06
            fill(this.hRange, 100, 100, lerp(0.1, 0.5, this.lerpAmount))
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
     * Altera o target do circulo, comecando o seu movimento em direcao a esse ponto
     * 
     * @param {[x,y]} position Proxima posicao do circulo 
     */
    setPosition(position) {
        this.target.set(position[0], position[1])
    }

    /**
     * Calcula a proxima posicao do circulo conforme os valores do target, spring e speed
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


