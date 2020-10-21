p5.disableFriendlyErrors = true

let open = false
let mobileMode = false
let polygon, polygonRadius, circleDiameter
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
    console.log(
          "░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░\n"
        + "░░░░░░░█▄█░█▀█░██▄░█▀█░░░█▀▄▒██▀░█▀▄░▄▀▄░░░░░░░\n"
        + "░░░░░░▒█▒█░█▄█▒█▄█░█▄█░░░█▀▄░█▄▄▒█▄▀░▀▄▀░░░░░░░\n"
        + "░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░\n"
        + "░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░\n"
        + "░░░░░░░░░░░▄█░█▀█░░░░▄▀░░▀█░█▀█░▀█░█▀█░░░░░░░░░\n"
        + "░░░░░░░░░░░░█░█▄█░▒▄▀░░░░█▄░█▄█░█▄░█▄█░░░░░░░░░\n"
        + "░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░\n"
        + "░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░\n"
        + "░░▒▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▒░░\n"
        + "░░▒▓                                       ▓▒░░\n"
        + "░░▒▓                                       ▓▒░░\n"
        + "░░▒▓          FERNANDO ESPARRINHA          ▓▒░░\n"
        + "░░▒▓ https://github.com/FernandoEsparrinha ▓▒░░\n"
        + "░░▒▓                                       ▓▒░░\n"
        + "░░▒▓               GIRLFLUX                ▓▒░░\n"
        + "░░▒▓         https://girlflux.xyz          ▓▒░░\n"
        + "░░▒▓                                       ▓▒░░\n"
        + "░░▒▓                 /\\_/\\                 ▓▒░░\n"
        + "░░▒▓                ( o.o )                ▓▒░░\n"
        + "░░▒▓                 > ^ <                 ▓▒░░\n"
        + "░░▒▓                                       ▓▒░░\n"
        + "░░▒▓            https://h0b0.me            ▓▒░░\n"
        + "░░▒▓                                       ▓▒░░\n"
        + "░░▒▓       https://h0b0.bandcamp.com       ▓▒░░\n"
        + "░░▒▓                                       ▓▒░░\n"
        + "░░▒▓▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▓▒░░\n"
        + "░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░\n"
        + "░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░\n"
    )

    pixelDensity(1)
    frameRate(30)

    noSleep = new NoSleep()
    document.addEventListener('touchstart', enableNoSleep, false)

    mobileMode = windowWidth < 640

    canvasPass = createCanvas(windowWidth, windowHeight)
    canvasPass.id('visuals')

    polygonRadius  = mobileMode ? windowHeight * 0.40 : windowHeight * 0.36
    circleDiameter = mobileMode ? windowHeight * 0.10 : polygonRadius * 0.25

    musicController = new MusicController()

    guiController = new GuiController()
    shaderController = new ShaderController()
    polygon = new Polygon(polygonRadius, circleDiameter, 17)
}

function draw() {
    // DRAW SETTINGS
    clear()
    if (!tracksLoaded) {
        cursor('wait')
    } else {
        cursor('pointer')
    }

    if (open) {
        if (activeGui) {
            cursor('default')
        } else {
            cursor('none')
        }
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
        guiController.switchMode()
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

function touchStarted(){
    if(isSafari){
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
    polygon = new Polygon(polygonRadius, circleDiameter, 17)
    if (open) {
        polygon.refreshPositions()
    }

    resizeCanvas(windowWidth, windowHeight)
}