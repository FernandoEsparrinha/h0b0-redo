let loopButton, slowButton, fastButton
let trackName, trackTime, trackSpeed
let gui, controls, display

class GuiController2 {
    constructor() {
        loopButton = createButton("∞")
        slowButton = createButton("⏪")
        fastButton = createButton("⏩")
        trackSpeed = createP("trackSpeed")
        trackName = createP("trackName")
        trackTime = createP("trackTime")

        loopButton.class('controller')
        slowButton.class('controller')
        fastButton.class('controller')
        trackSpeed.class('controller')
        trackName.class('controller')
        trackTime.class('controller')

        loopButton.addClass('toggle')
        slowButton.addClass('button')
        fastButton.addClass('button')
        trackSpeed.addClass('display')
        trackName.addClass('display')
        trackTime.addClass('display')
        
        loopButton.id('loopButton')
        slowButton.id('slowButton')
        fastButton.id('fastButton')
        trackSpeed.id('trackSpeed')
        trackName.id('trackName')
        trackTime.id('trackTime')

        gui = document.getElementById('gui')
        controls = document.getElementById('controls')
        display  = document.getElementById('display')

        loopButton.parent(controls)
        slowButton.parent(controls)
        fastButton.parent(controls)
        trackSpeed.parent(controls)
        trackName.parent(display)
        trackTime.parent(display)
    }

    draw() {
        this.drawLoadGui()

        if (tracksLoaded && open) {
            this.drawMainGui()
        }
    }

    drawLoadGui() {
        textFont(fontVCR)
        //textFont(fontH0b0)
        stroke(0, 0, 0)
        strokeWeight(2)
        fill(55, 90, 100)

        if (!tracksLoaded) {
            textSize(32)
            text('LOADING (' + (loadIndex + 1) + '/17)', windowWidth * 0.5, windowHeight * 0.8)
        }

        if (tracksLoaded && !open) {
            textSize(32)
            text('h0b0   redo', windowWidth * 0.5, windowHeight * 0.8)

            // "3D" arrow effect (static)
            for (let w = 0; w < 10; w++) {
                text('     ↑     ', windowWidth * 0.5, windowHeight * 0.8 - w)
            }
        }
    }

    drawMainGui() {
        trackName.html(trackList[musicController.trackPlaying])
        trackTime.html("(" + musicController.getCurrentPlaybackPosition() + ")")
        trackSpeed.html("x" + musicController.getCurrentPlaybackSpeed().toFixed(1))
    }

    switchMode() {
        loopMode = !loopMode
        musicController.playTrack(musicController.trackPlaying, true)
        console.log(loopMode)
    }

    slower() {
        musicController.decreaseSpeed()
    }

    faster() {
        musicController.increaseSpeed()
    }

    handleClicking() {
        for (let i = 0; i < 17; i++) {
            let d = dist(mouseX, mouseY, verticesPosition[i][0], verticesPosition[i][1])
            if (d < (polygon.vertices[0].diameter / 2)) {
                musicController.playTrack((i + musicController.getTrackNumberPlaying()) % 17)
            }
        }

        loopButton.mousePressed(this.switchMode)
        slowButton.mousePressed(this.slower)
        fastButton.mousePressed(this.faster)
    }
}