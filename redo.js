p5.disableFriendlyErrors = true

let open = false;
let polygon, polygonRadius
let musicController

let verticesPosition = []
let fontMono

// videos
let vidSky, vidWater

// this variable will hold our createGraphics layer
let shaderGraphics

// copy layer for the video feedback effect
let copyLayer

// these variables will hold our shader objects
let gradientShader
let videoShader, videoMirrorShader, videoFeedbackShader


function preload() {
    fontMono = loadFont('assets/type/VCR_OSD_MONO_1.001.ttf')

    vidSky   = createVideo(['assets/video/aviao-ceu-01.mp4', 'assets/video/aviao-ceu-01.webm'], videoLoaded)
    vidWater = createVideo(['assets/video/agua-01.mp4', 'assets/video/agua-01.webm'], videoLoaded)

    gradientShader      = loadShader('shaders/shader.vert', 'shaders/gradient.frag')
    videoShader         = loadShader('shaders/shader.vert', 'shaders/videoProportion.frag')
    videoMirrorShader   = loadShader('shaders/shader.vert', 'shaders/videoMirror.frag')
    videoFeedbackShader = loadShader('shaders/shader.vert', 'shaders/videoFeedback.frag')
    videoClampShader    = loadShader('shaders/shader.vert', 'shaders/videoClamp.frag')
}

function setup() {
    createCanvas(windowWidth, windowHeight)

    polygonRadius = windowHeight * 0.4

    musicController = new MusicController()
    polygon = new Polygon(polygonRadius, 18)

    // shaders require WEBGL mode to work
    shaderGraphics = createGraphics(windowWidth, windowHeight, WEBGL)
    shaderGraphics.noStroke()

    // this layer will just be a copy of what we just did with the shader
    copyLayer = createGraphics(windowWidth, windowHeight)
    
    // sets the active shader
    shaderGraphics.shader(gradientShader)
}

function draw() {
    // DRAW SETTINGS
    clear()
    colorMode(HSB)
    noFill()
    strokeWeight(1)
    textAlign(CENTER)
    
    // hide the video window that is automatically displayed
    vidSky.hide()
    vidWater.hide()

    // send video to the shader as a uniform
    videoShader.setUniform('tex0', vidSky)
    videoMirrorShader.setUniform('tex0', vidSky)
    videoFeedbackShader.setUniform('tex0', vidSky)
    videoClampShader.setUniform('tex0', vidSky)

    // other shader uniforms
    gradientShader.setUniform("resolution", [width, height])
    videoClampShader.setUniform("resolution", [width, height])
    videoClampShader.setUniform("mouse", [mouseX, map(mouseY, 0, height, height, 0)])

    // send the copy layer to the shader as a uniform
    videoFeedbackShader.setUniform('tex1', copyLayer)

    // send mouseIsPressed to the shader as a int (either 0 or 1)
    videoFeedbackShader.setUniform('mouseDown', int(mouseIsPressed))

    // rect gives us some geometry on the screen
    shaderGraphics.rect(0, 0, windowWidth, windowHeight)

    // draw the shaderlayer into the copy layer
    copyLayer.image(shaderGraphics, 0,0,width, height)

    // displays the shader image
    image(shaderGraphics, 0, 0, windowWidth, windowHeight)

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
    }
    // 1
    else if (keyCode === 49) {
        console.log('keyPressed: 1')

        // sets the active shader
        shaderGraphics.shader(gradientShader)
    }
    // 2
    else if (keyCode === 50) {
        console.log('keyPressed: 2')

        // sets the active shader
        shaderGraphics.shader(videoShader)
    }
    // 3
    else if (keyCode === 51) {
        console.log('keyPressed: 3')

        // sets the active shader
        shaderGraphics.shader(videoMirrorShader)
    }
    // 4
    else if (keyCode === 52) {
        console.log('keyPressed: 4')

        // sets the active shader
        shaderGraphics.shader(videoFeedbackShader)
    }
    // 5
    else if (keyCode === 53) {
        console.log('keyPressed: 5')

        // sets the active shader
        shaderGraphics.shader(videoClampShader)
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