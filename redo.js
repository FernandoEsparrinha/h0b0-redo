p5.disableFriendlyErrors = true

let open = false;
let polygon, polygonRadius
let musicController

// podes verificar se este target não está a mais?
let target

let verticesPosition = []
let fontMono

let vidSkyPlane

// this variable will hold our createGraphics layer
let shaderGraphics
// this variable will hold our shader object
let gradientShader

let oscillation

function preload() {
    fontMono = loadFont('assets/type/VCR_OSD_MONO_1.001.ttf')
    gradientShader = loadShader('shaders/gradient.vert', 'shaders/gradient.frag')

    vidSkyPlane = createVideo(['assets/video/aviao-ceu-01.mov'])
}

function setup() {
    createCanvas(windowWidth, windowHeight)

    polygonRadius = windowHeight * 0.4

    musicController = new MusicController()
    polygon = new Polygon(polygonRadius, 18)

    // shaders require WEBGL mode to work
    shaderGraphics = createGraphics(windowWidth, windowHeight, WEBGL)
    shaderGraphics.noStroke()

    oscillation = 0
}

function draw() {
    // DRAW SETTINGS
    clear()
    colorMode(HSB)
    noFill()
    strokeWeight(1)

    // sets the active shader
    shaderGraphics.shader(gradientShader)
    // rect gives us some geometry on the screen
    shaderGraphics.rect(0, 0, windowWidth, windowHeight)

    image(shaderGraphics, 0, 0, windowWidth, windowHeight)

    polygon.draw()

    if (!tracksLoaded) {
        textFont(fontMono)
        textAlign(CENTER)
        textSize(32)

        stroke(0, 0, 0)
        strokeWeight(2)
        fill(55, 90, 100)
        text('LOADING (' + (loadIndex + 1) + '/18)', windowWidth * 0.5, windowHeight * 0.8)
    }

    if (tracksLoaded && !open) {
        fill(55, 90, 100)
        text('h0b0   redo', windowWidth * 0.5, windowHeight * 0.8)

        // "3D" arrow effect (static)
        for (let w = 0; w < 10; w++) {
            text('     ↑     ', windowWidth * 0.5, windowHeight * 0.8 - w)
        }

        // "3D" arrow effect (oscillating)
        /*
        for (let w = 0; w < 10; w++) {
            text('     ↑     ', windowWidth * 0.5, windowHeight * 0.8 - (((sin(oscillation) * 10) / 2) + 5) - w)
        }
        */

        // single oscillating arrow
        /*
        text('     ↑     ', windowWidth * 0.5, windowHeight * 0.8 - (((sin(oscillation) * 10) / 2) + 5))
        oscillation += 0.06
        */
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
            polygon.refreshPositions()
            musicController.startPlaying()
            open = true
        } else {
            for (let i = 0; i < 18; i++) {
                let d = dist(mouseX, mouseY, verticesPosition[i][0], verticesPosition[i][1])
                if (d < (polygon.vertices[0].diameter / 2)) {
                    musicController.playTrack((i + musicController.getTrackNumberPlaying()) % 18)
                }
            }
        }

    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight)

    // era importante que o polígono se adaptasse ao canvas
    // imagino isto como sendo importante no caso do telemóvel e alguém o rodar
    // não está é a funcionar deste modo, apesar do polygonRadius actualizar os valores
    polygonRadius = windowHeight * 0.4
    console.log(polygonRadius)
}