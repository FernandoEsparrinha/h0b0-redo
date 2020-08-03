p5.disableFriendlyErrors = true

let open = false;
let polygon, musicController, target
let verticesPosition = []

function setup() {
    createCanvas(windowWidth, windowHeight)

    musicController = new MusicController();
    polygon = new Polygon(400, 18)
}

function draw() {
    // DRAW SETTINGS
    clear()
    colorMode(HSB)
    noFill()
    strokeWeight(1)

    polygon.draw()

    if (!tracksLoaded) {
        fill(170, 57, 57)
        textSize(32)
        textAlign(CENTER)
        text('Loading (' + (loadIndex + 1) + '/18)', windowWidth / 2, windowHeight / 3)
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
    if (tracksLoaded) {
        if (!open) {
            open = true
            polygon.refreshPositions()
            musicController.playTrack(0)
        }

        for (let i = 0; i < 18; i++) {
            let d = dist(mouseX, mouseY, verticesPosition[i][0], verticesPosition[i][1])
            if (d < polygon.vertices[0].diameter) {
                if (i == 0) {
                    musicController.play()
                } else {
                    musicController.playTrack((i + musicController.getTrackNumberPlaying()) % 18)
                }
            }
        }
    }
}
