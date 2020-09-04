p5.disableFriendlyErrors = true

let open = false;
let polygon, polygonRadius
let musicController, fft, peakDetect, amplitude

let verticesPosition = []

function preload() {
    fontMono = loadFont('assets/type/VCR_OSD_MONO_1.001.ttf')
    //fontH0b0 = loadFont('assets/type/H0b0.otf')

    vidGu = createVideo(['assets/video/sky.mov'], videoLoaded)
    imgColorNoise = loadImage('assets/image/rgbNoiseCloud-w2048-h2048.png')

    gradientShader = loadShader('shaders/shader.vert', 'shaders/gradient.frag')
    feedbackShader = loadShader('shaders/shader.vert', 'shaders/feedback.frag')
}

function setup() {
    pixelDensity(1)

    createCanvas(windowWidth, windowHeight)

    polygonRadius = windowHeight * 0.32

    musicController = new MusicController()

    guiController = new GuiController()
    shaderController = new ShaderController()
    polygon = new Polygon(polygonRadius, 18)
}

function draw() {
    // DRAW SETTINGS
    clear()
    cursor(ARROW)
    background(0)
    colorMode(HSB)
    noFill()
    textAlign(CENTER, CENTER)

    shaderController.draw()
    polygon.draw()
    guiController.draw()
}

// This function is called when the video loads
function videoLoaded() {
    vidGu.loop()
    vidGu.volume(0)
    console.log('vidGu: has loaded')
}

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

    //shaders
    // 1
    else if (keyCode === 49) {
        console.log('keyPressed: 1')
        shaderController.changeShader(1)
    }
    // 2
    else if (keyCode === 50) {
        console.log('keyPressed: 2')
        shaderController.changeShader(2)
    }
}

function mouseClicked() {
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