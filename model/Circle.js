class Circle {

    constructor(position, diameter, index) {
        this.originalX = position[0]
        this.originalY = position[1]

        this.X = windowWidth / 2
        this.Y = windowHeight / 2

        this.pos = new p5.Vector(0, 0)
        // this.target = new p5.Vector(position[0], position[1])
        // this.target = new p5.Vector(windowWidth / 2, windowHeight / 2)
        this.target = new p5.Vector(lerp(windowWidth / 2, this.originalX, 0.15), lerp(windowHeight / 2, this.originalY, 0.15))

        this.vel = new p5.Vector(0, 0)
        this.velX = 0
        this.velY = 0
        this.spring = 0.20
        this.speed = 0.05

        this.diameter = diameter
        this.index = index
    }

    draw() {
        push()
        this.calculateMovement()

        let isPlaying = this.index == musicController.getTrackNumberPlaying()
        let isBeingHovered = (dist(mouseX, mouseY, this.X, this.Y) < (this.diameter / 2))
        // h is used for full 360 hue (rainbow)
        let h = this.index * (360 / 18)
        // hRange is used to restrict the palette
        let hRange = map(h, 0, 360, 150, 300)

        if (!open) {
            // Antes do primeiro click
            stroke(hRange, 100, 100)
            fill(hRange, 100, 100, 0.05)
        } else {
            // Depois do primeiro click
            if (isPlaying) {
                stroke(0, 0, 100)
            } else {
                stroke(hRange, 100, 100)
            }

            if (isBeingHovered) {
                fill(hRange, 100, 100)
            }

            text(this.index, this.X, this.Y)
        }

        // Só desenha o circulo depois da musica correspondente ter sido carregada
        if (loadIndex >= this.index) {
            circle(this.X, this.Y, this.diameter)
        }
        pop()
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


