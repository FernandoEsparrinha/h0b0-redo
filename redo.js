p5.disableFriendlyErrors = true

let open = false
let mobileMode = false
let polygon, polygonRadius
let musicController, fft, peakDetect, amplitude

let verticesPosition = []

function preload() {
    fontVCR = loadFont('assets/type/VCR_OSD_MONO_EDIT.ttf')
    // fontH0b0 = loadFont('assets/type/H0b0.otf')

    // vidGu = createVideo(['assets/video/sky.mov'], videoLoaded)
    imgColorNoise = loadImage('assets/image/rgbNoiseCloud-w2048-h2048.png')
    imgMiraTecnica = loadImage('assets/image/miraTecnica.jpg')

    gradientShader = loadShader('shaders/shader.vert', 'shaders/gradient.frag')
    feedbackShader = loadShader('shaders/shader.vert', 'shaders/feedback.frag')
    crtShader = loadShader('shaders/shader.vert', 'shaders/crt.frag')
}

function setup() {
    pixelDensity(1)

    mobileMode = windowWidth < 504
    
    createCanvas(windowWidth, windowHeight)

    polygonRadius = mobileMode ? windowHeight * 0.50 : windowHeight * 0.32

    musicController = new MusicController()

    guiController = new GuiController()
    shaderController = new ShaderController()
    polygon = new Polygon(polygonRadius, 18)
}

function draw() {
    // DRAW SETTINGS
    clear()
    if (!tracksLoaded) {
        cursor(WAIT)
    } else {
        cursor(ARROW)
    }
    background(0)
    colorMode(HSB)
    noFill()
    textAlign(CENTER, CENTER)

    shaderController.draw()
    polygon.draw()
    guiController.draw()
    musicController.logValues()
}

// This function is called when the video loads
// function videoLoaded() {
//     vidGu.loop()
//     vidGu.volume(0)
//     console.log('vidGu: has loaded')
// }

function keyPressed() {
    // left
    if (keyCode === 37) {
        musicController.previous()
    }
    // right
    else if (keyCode === 39) {
        musicController.next()
    }
    // up
    else if (keyCode === 38) {
        loopMode = !loopMode
        musicController.playTrack(musicController.trackPlaying, true)
    }
}

function mousePressed() {
    if (tracksLoaded) {
        if (!open) {
            polygon.refreshPositions()
            musicController.startPlaying()
            open = true
        } else {
            guiController.handleClicking()
        }
    }
}

function doubleClicked() {
    if (tracksLoaded) {
        if (open) {
            // bottom circle is the only one that can be active
            // we can compare only with that array position
            let d = dist(mouseX, mouseY, verticesPosition[0][0], verticesPosition[0][1])
            if (d < (polygon.vertices[0].diameter / 2)) {
                console.log('doubleClicked: inside playing circle')
                loopMode = !loopMode
            }
            else {
                console.log('doubleClicked: outside playing circle')
            }
        }
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight)

    // era importante que o polígono se adaptasse ao canvas
    // imagino isto como sendo importante no caso do telemóvel e alguém o rodar
    // não está é a funcionar deste modo, apesar do polygonRadius actualizar os valores
    polygonRadius = windowHeight * 0.32
}