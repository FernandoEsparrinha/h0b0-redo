p5.disableFriendlyErrors = true

let open = false;
let polygon, polygonRadius
let musicController, fft, peakDetect, amplitude

let verticesPosition = []

function preload() {
    fontMono = loadFont('assets/type/VCR_OSD_MONO_1.001.ttf')

    vidSky = createVideo(['assets/video/aviao-ceu-01.mp4', 'assets/video/aviao-ceu-01.webm'], videoLoaded)
    vidWater = createVideo(['assets/video/agua-01.mp4', 'assets/video/agua-01.webm'], videoLoaded)
    vidGu = createVideo(['assets/video/sky.mov'], videoLoaded)

    imgVegan = loadImage('assets/image/soyVegano-w216-h152.png')

    gradientShader = loadShader('shaders/shader.vert', 'shaders/gradient.frag')
    videoShader = loadShader('shaders/shader.vert', 'shaders/videoProportion.frag')
    videoMirrorShader = loadShader('shaders/shader.vert', 'shaders/videoMirror.frag')
    videoFeedbackShader = loadShader('shaders/shader.vert', 'shaders/videoFeedback.frag')
    videoClampShader = loadShader('shaders/shader.vert', 'shaders/videoClamp.frag')
    videoWormsShader = loadShader('shaders/shader.vert', 'shaders/videoWorms.frag')
    videoKernelShader = loadShader('shaders/shader.vert', 'shaders/videoConvolutionKernel.frag')
}

function setup() {
    pixelDensity(1)

    createCanvas(windowWidth, windowHeight)

    polygonRadius = windowHeight * 0.4

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

    vidSky.loop()
    vidSky.volume(0)
    console.log('vidSky: has loaded')

    vidWater.loop()
    vidWater.volume(0)
    console.log('vidWater: has loaded')
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
    // 3
    else if (keyCode === 51) {
        console.log('keyPressed: 3')
        shaderController.changeShader(3)
    }
    // 4
    else if (keyCode === 52) {
        console.log('keyPressed: 4')
        shaderController.changeShader(4)
    }
    // 5
    else if (keyCode === 53) {
        console.log('keyPressed: 5')
        shaderController.changeShader(5)
    }
    // 6
    else if (keyCode === 54) {
        console.log('keyPressed: 6')
        shaderController.changeShader(6)
    }
    // 6
    else if (keyCode === 55) {
        console.log('keyPressed: 7')
        shaderController.changeShader(7)
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
    polygonRadius = windowHeight * 0.4
}