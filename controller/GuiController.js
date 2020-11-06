let loopButton, slowButton, fastButton
let trackName, trackTime, trackSpeed
let gui, controls, display
let activeGui = true, timeGuiActivated
let activeDisplay = false, timeTrackChanged

class GuiController {
    constructor() {
        loopButton = createButton('∞')
        slowButton = createButton('⏪')
        trackSpeed = createP('trackSpeed')
        fastButton = createButton('⏩')
        trackName = createP('trackName')
        trackTime = createP('trackTime')

        loopButton.class('controller')
        slowButton.class('controller')
        trackSpeed.class('controller')
        fastButton.class('controller')
        trackName.class('controller')
        trackTime.class('controller')

        loopButton.addClass('toggle')
        slowButton.addClass('button')
        trackSpeed.addClass('display')
        fastButton.addClass('button')
        trackName.addClass('display')
        trackTime.addClass('display')

        loopButton.id('loopButton')
        slowButton.id('slowButton')
        trackSpeed.id('trackSpeed')
        fastButton.id('fastButton')
        trackName.id('trackName')
        trackTime.id('trackTime')

        gui = select('#gui')
        controls = select('#controls')
        display = select('#display')

        loopButton.parent(controls)
        slowButton.parent(controls)
        trackSpeed.parent(controls)
        fastButton.parent(controls)
        trackName.parent(display)
        trackTime.parent(display)
    }

    draw() {
        // Check how many milliseconds passed since gui showed up
        if (millis() > timeGuiActivated + 10000) {
            activeGui = false
        }

        if (millis() > timeTrackChanged + 4000) {
            activeDisplay = false
        }

        this.drawLoadGui()

        if (tracksLoaded && open) {
            if (activeGui) {
                gui.style('visibility', 'visible')
                controls.style('transform: translate(0rem, 0rem);')
                display.style('transform: translate(0rem, 0rem);')

                if (!mobileMode) {
                    display.style('visibility', 'visible')
                }

            } else {
                controls.style('transform: translate(0rem, 6rem);')
                
                if (activeDisplay) {
                    display.style('transform: translate(0rem, 0rem)')
                } else {
                    display.style('transform: translate(0rem, 6rem)')
                }
            }

            this.drawMainGui()
            
        } else {
            gui.style('visibility', 'hidden')
        }
    }

    drawLoadGui() {
        textFont(fontVCR)
        stroke(0, 0, 0)
        strokeWeight(2)
        fill(55, 90, 100)

        if (!tracksLoaded) {
            textSize(28)
            text('LOADING (' + (loadIndex + 1) + '/' + numCircles + ')', windowWidth * 0.5, windowHeight * 0.8)
        }

        if (tracksLoaded && !open) {
            textSize(28)
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
            loopButton.addClass('loopMode')
        }
        else {
            loopButton.removeClass('loopMode')
        }
    }

    slower() {
        musicController.decreaseSpeed()
    }

    normal() {
        musicController.resetSpeed()
    }

    faster() {
        musicController.increaseSpeed()
    }

    handleClicking() {
        for (let i = 0; i < numCircles; i++) {
            let d = dist(mouseX, mouseY, verticesPosition[i][0], verticesPosition[i][1])
            if (d < (polygon.vertices[0].diameter / 2)) {
                musicController.playTrack((i + musicController.getTrackNumberPlaying()) % numCircles)
            }
        }

        loopButton.mousePressed(this.switchMode)
        slowButton.mousePressed(this.slower)
        trackSpeed.mousePressed(this.normal)
        fastButton.mousePressed(this.faster)
    }

    activateGui() {
        activeGui = true
        timeGuiActivated = millis()
    }

    activateDisplay() {
        activeDisplay = true
        timeTrackChanged = millis()
    }
}