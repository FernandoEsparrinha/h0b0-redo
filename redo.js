p5.disableFriendlyErrors = true;

let polygon, musicController;

function setup() {
    createCanvas(windowWidth, windowHeight)

    // loadTracklist()
    musicController = new MusicController();
    polygon = new Polygon(0, 0, 400, 18)
}

function draw() {
    clear()
    noFill()
    strokeWeight(1)
    if (tracksLoaded) {
        polygon.draw()
    } else {
        fill(0, 102, 153)
        textSize(32)
        text('Loading (' + (loadIndex + 1) + '/18)', windowWidth / 2, windowHeight / 2)
    }
}

function keyPressed() {
    if (keyCode === 37) {
        // polygon.next()
        musicController.next()

    } else if (keyCode === 39) {
        // polygon.previous()
        musicController.previous()
    }
}

function mousePressed() {
    print(mouseX)
    print(mouseY)
    // let d = dist(mouseX, mouseY, circleCenterX, circleCenterY)
    // if (d < circleSize) {
    //   active = !active;
    // }
}
