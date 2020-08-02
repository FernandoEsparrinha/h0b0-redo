p5.disableFriendlyErrors = true;

let polygon, musicController
let verticesPosition = []

function setup() {
    createCanvas(windowWidth, windowHeight)

    // loadTracklist()
    musicController = new MusicController();
    polygon = new Polygon(400, 18)
}

function draw() {
    clear()
    colorMode(HSB)
    background(21, 0, 12)

    noFill()
    strokeWeight(1)

    if (tracksLoaded) {
        polygon.draw()
    } else {
        fill(170, 57, 57)
        textSize(32)
        text('Loading (' + (loadIndex + 1) + '/18)', windowWidth / 2, windowHeight / 2)
    }
}

function keyPressed() {
    if (keyCode === 37) {
        musicController.next()
    } else if (keyCode === 39) {
        musicController.previous()
    }
}

function mousePressed() {
    for (let i = 0; i < 18; i++) {
        let d = dist(mouseX, mouseY, verticesPosition[i][0], verticesPosition[i][1])
        if (d < polygon.vertices[0].diameter) {
            musicController.playTrack((i + musicController.getTrackNumberPlaying()) % 18)
        }
    }
}
