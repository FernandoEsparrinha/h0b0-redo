p5.disableFriendlyErrors = true

let open = false;
let polygon, polygonRadius
let musicController

let verticesPosition = []
let fontMono

let vidSky

// this variable will hold our createGraphics layer
let shaderGraphics
// this variable will hold our shader object
let gradientShader
let videoShader

function preload() {
    fontMono = loadFont('assets/type/VCR_OSD_MONO_1.001.ttf')

    vidSky = createVideo(['assets/video/aviao-ceu-01.mov', 'assets/video/aviao-ceu-01.webm'], videoLoaded)

    gradientShader = loadShader('shaders/gradient.vert', 'shaders/gradient.frag')
    videoShader = loadShader('shaders/video.vert', 'shaders/video.frag')
}

function setup() {
    createCanvas(windowWidth, windowHeight)

    polygonRadius = windowHeight * 0.4

    musicController = new MusicController()
    polygon = new Polygon(polygonRadius, 18)

    // shaders require WEBGL mode to work
    shaderGraphics = createGraphics(windowWidth, windowHeight, WEBGL)
    shaderGraphics.noStroke()
}

function draw() {
    // DRAW SETTINGS
    clear()
    colorMode(HSB)
    noFill()
    strokeWeight(1)
    
    // hide the video window that is automatically displayed
    vidSky.hide()

    // sets the active shader
    shaderGraphics.shader(videoShader)

    // send the video to the shader as a uniform
    videoShader.setUniform('tex0', vidSky);

    // rect gives us some geometry on the screen
    shaderGraphics.rect(0, 0, windowWidth, windowHeight)

    // displays the shader image
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
}

function keyPressed() {
    if (keyCode === 37) {
        musicController.previous()
    }
    else if (keyCode === 39) {
        musicController.next()
    }
    else if (keyCode === 38) {
        loopMode = !loopMode
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