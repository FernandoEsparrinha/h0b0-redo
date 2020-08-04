p5.disableFriendlyErrors = true

let open = false;
let polygon, musicController, target
let verticesPosition = []
let fontMono

function preload() {
    fontMono = loadFont('assets/type/VCR_OSD_MONO_1.001.ttf')
}

function setup() {
    createCanvas(windowWidth, windowHeight)

    musicController = new MusicController()
    polygon = new Polygon(300, 18)
}

function draw() {
    // DRAW SETTINGS
    clear()
    colorMode(HSB)
    noFill()
    strokeWeight(1)

    polygon.draw()

    if (!tracksLoaded) {
        stroke(0, 0, 0)
        strokeWeight(2)
        fill(55, 90, 100)

        textFont(fontMono)
        textSize(32)
        textAlign(CENTER)
        text('LOADING (' + (loadIndex + 1) + '/18)', windowWidth * 0.5, windowHeight * 0.8)
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
            if (d < (polygon.vertices[0].diameter / 2)) {
                if (i == 0) {
                    musicController.play()
                } else {
                    musicController.playTrack((i + musicController.getTrackNumberPlaying()) % 18)
                }
            }
        }
    }
}
