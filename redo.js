p5.disableFriendlyErrors = true

let open = false;
let polygon, musicController, target
let verticesPosition = []
let fontMono

// this variable will hold our createGraphics layer
let shaderGraphics
// this variable will hold our shader object
let gradientShader

let oscillation

function preload() {
    fontMono = loadFont('assets/type/VCR_OSD_MONO_1.001.ttf')
    gradientShader = loadShader('shaders/texcoord.vert', 'shaders/texcoord.frag')
}

function setup() {
    createCanvas(windowWidth, windowHeight)

    musicController = new MusicController()
    polygon = new Polygon(300, 18)

    // shaders require WEBGL mode to work
    shaderGraphics = createGraphics(windowWidth, windowHeight, WEBGL)
    shaderGraphics.noStroke()

    oscillation = 0
}

function draw() {
    // sets the active shader
    shaderGraphics.shader(gradientShader)
    // rect gives us some geometry on the screen
    shaderGraphics.rect(0, 0, windowWidth, windowHeight)

    image(shaderGraphics, 0, 0, windowWidth, windowHeight)

    // DRAW SETTINGS
    //clear()
    colorMode(HSB)
    noFill()
    strokeWeight(1)

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
