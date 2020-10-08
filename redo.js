p5.disableFriendlyErrors = true

let open = false
let mobileMode = false
let polygon, polygonRadius
let musicController
let verticesPosition = []
let canvasPass

let noSleep


function preload() {
    fontVCR = loadFont('assets/type/VCR_OSD_MONO_EDIT.ttf')

    noiseShader     = loadShader('shaders/shader.vert', 'shaders/noise.frag')
    feedbackShader  = loadShader('shaders/shader.vert', 'shaders/feedback.frag')
    crtShader       = loadShader('shaders/shader.vert', 'shaders/crt.frag')
}

function setup() {
    console.log('displayDensity: ' + displayDensity())
    pixelDensity(1)

    frameRate(30)

    noSleep = new NoSleep()
    document.addEventListener('touchstart', enableNoSleep, false)

    mobileMode = windowWidth < 640

    canvasPass = createCanvas(windowWidth, windowHeight)
    canvasPass.id('visuals')

    polygonRadius = mobileMode ? windowHeight * 0.52 : windowHeight * 0.375

    musicController = new MusicController()

    guiController = new GuiController()
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
}

function keyPressed() {
    // any key
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
}

// mobile chrome touch double click fix
// var released = true;

// function mouseReleased(){
//     released = true;
//     return false;
// }

function mousePressed() {
    // if(!released){
    //     return;
    // }
    // released = false;

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
    if (tracksLoaded) {
        if (open) {
            guiController.activateGui()
        }
    }
}


function windowResized() {
    mobileMode = windowWidth < 640
    polygonRadius = mobileMode ? windowHeight * 0.52 : windowHeight * 0.375
    polygon = new Polygon(polygonRadius, 17)
    if (open) {
        polygon.refreshPositions()
    }

    resizeCanvas(windowWidth, windowHeight)
}