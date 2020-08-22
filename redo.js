p5.disableFriendlyErrors = true

let open = false;
let polygon, polygonRadius
let musicController, fft, peakDetect, amplitude

let verticesPosition = []

function preload() {
    fontMono = loadFont('assets/type/VCR_OSD_MONO_1.001.ttf')

    vidSky = createVideo(['assets/video/aviao-ceu-01.mp4', 'assets/video/aviao-ceu-01.webm'], videoLoaded)
    vidWater = createVideo(['assets/video/agua-01.mp4', 'assets/video/agua-01.webm'], videoLoaded)

    imgVegan = loadImage('assets/image/soyVegano-w216-h152.png')

    gradientShader = loadShader('shaders/shader.vert', 'shaders/gradient.frag')
    videoShader = loadShader('shaders/shader.vert', 'shaders/videoProportion.frag')
    videoMirrorShader = loadShader('shaders/shader.vert', 'shaders/videoMirror.frag')
    videoFeedbackShader = loadShader('shaders/shader.vert', 'shaders/videoFeedback.frag')
    videoClampShader = loadShader('shaders/shader.vert', 'shaders/videoClamp.frag')
}

function setup() {
    pixelDensity(1)

    createCanvas(windowWidth, windowHeight)

    polygonRadius = windowHeight * 0.4

    musicController = new MusicController()
    shaderController = new ShaderController()
    // guiController = new GuiController()
    polygon = new Polygon(polygonRadius, 18)
}

function draw() {
    // DRAW SETTINGS
    clear()
    background(0)
    colorMode(HSB)
    noFill()
    strokeWeight(1)
    textAlign(CENTER)

    // guiController.draw()
    shaderController.draw()
    polygon.draw()

    if (!tracksLoaded) {
        textFont(fontMono)
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
    }

    if (tracksLoaded && open) {
        textAlign(LEFT)
        fill(55, 90, 100)
        text(loopMode ? "looping" : "album mode", windowWidth * 0.05, windowHeight * 0.95)
        // textSize(12)
        // text(JSON.stringify(tracks[musicController.trackPlaying], null, " "), 10, 40)
        // textSize(32)
    }
}

// This function is called when the video loads
function videoLoaded() {
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
}

function mouseClicked() {
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