p5.disableFriendlyErrors = true

let open = false
let mobileMode = false
let polygon, polygonRadius
let musicController, fft, peakDetect, amplitude

let active = true
let lastTimeActivated

let noSleep

let canvasPass

let verticesPosition = []

function preload() {
    fontVCR = loadFont('assets/type/VCR_OSD_MONO_EDIT.ttf')
    // fontH0b0 = loadFont('assets/type/H0b0.otf')

    imgColorNoise = loadImage('assets/image/rgbNoiseCloud-w2048-h2048.png')
    imgMiraTecnica = loadImage('assets/image/miraTecnica.jpg')

    gradientShader = loadShader('shaders/shader.vert', 'shaders/gradient.frag')
    feedbackShader = loadShader('shaders/shader.vert', 'shaders/feedback.frag')
    compositeShader = loadShader('shaders/shader.vert', 'shaders/composite.frag')
    alphaShader = loadShader('shaders/shader.vert', 'shaders/alpha.frag')
    crtShader = loadShader('shaders/shader.vert', 'shaders/crt.frag')
}

function setup() {
    console.log('displayDensity: ' + displayDensity())
    pixelDensity(1)

    noSleep = new NoSleep()
    document.addEventListener('touchstart', enableNoSleep, false)

    mobileMode = windowWidth < 640

    canvasPass = createCanvas(windowWidth, windowHeight)
    canvasPass.id('visuals')

    polygonRadius = mobileMode ? windowHeight * 0.50 : windowHeight * 0.32

    musicController = new MusicController()

    guiController = new GuiController2()
    shaderController = new ShaderController()
    polygon = new Polygon(polygonRadius, 17)
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

function keyPressed() {
    guiController.activateGui()
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
    // m (menu)
    else if (keyCode === 77) {
        musicController.menu = !musicController.menu
    }
}

function mousePressed() {
    guiController.activateGui()
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

function mouseMoved() {
    guiController.activateGui()
}


function windowResized() {
    resizeCanvas(windowWidth, windowHeight)

    // era importante que o polígono se adaptasse ao canvas
    // imagino isto como sendo importante no caso do telemóvel e alguém o rodar
    // não está é a funcionar deste modo, apesar do polygonRadius actualizar os valores
}