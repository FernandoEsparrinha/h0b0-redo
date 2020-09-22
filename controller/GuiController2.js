let loopButton, slowButton, fastButton
let trackName, trackTime, trackSpeed
let gui, controls, display

class GuiController2 {
    constructor() {
        loopButton = createButton('∞')
        loopButton.class('controller')
        loopButton.addClass('toggle')
        loopButton.id('loopButton')
        loopButton.parent(controls)

        slowButton = createButton('⏪')
        slowButton.class('controller')
        slowButton.addClass('button')
        slowButton.id('slowButton')
        slowButton.parent(controls)

        trackSpeed = createP('trackSpeed')
        trackSpeed.class('controller')
        trackSpeed.addClass('button')
        trackSpeed.id('trackSpeed')
        trackSpeed.parent(controls)

        fastButton = createButton('⏩')
        fastButton.class('controller')
        fastButton.addClass('button')
        fastButton.id('fastButton') 
        fastButton.parent(controls) 

        trackName = createP('trackName')
        trackName.class('controller')
        trackName.addClass('display')
        trackName.id('trackName')
        trackName.parent(display)

        trackTime = createP('trackTime')
        trackTime.class('controller')
        trackTime.addClass('display')
        trackTime.id('trackTime')
        trackTime.parent(display)
        
        gui      = select('#gui')
        controls = select('#controls')
        display  = select('#display')
    }

    draw() {
        this.drawLoadGui()

        if (tracksLoaded && open) {
            gui.style('visibility', 'visible')
            this.drawMainGui()
        } else {
            gui.style('visibility', 'hidden')
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
        trackSpeed.html('x' + musicController.getCurrentPlaybackSpeed().toFixed(1))
        trackName.html(trackList[musicController.trackPlaying])
        trackTime.html('(' + musicController.getCurrentPlaybackPosition() + ')')
    }

    switchMode() {
        loopMode = !loopMode
        musicController.playTrack(musicController.trackPlaying, true)
        if (loopMode) {
            loopButton.style('background-color: hsla(55, 100%, 55%, 1.0)')

        } else {
            loopButton.style('background-color: transparent')

        }
        console.log(loopMode)
    }

    handleClicking() {
        for (let i = 0; i < 17; i++) {
            let d = dist(mouseX, mouseY, verticesPosition[i][0], verticesPosition[i][1])
            if (d < (polygon.vertices[0].diameter / 2)) {
                musicController.playTrack((i + musicController.getTrackNumberPlaying()) % 17)
            }
        }

        loopButton.mousePressed(this.switchMode())
        slowButton.mousePressed(musicController.decreaseSpeed())
        trackSpeed.mousePressed(musicController.resetSpeed())
        fastButton.mousePressed(musicController.increaseSpeed())
    }
}