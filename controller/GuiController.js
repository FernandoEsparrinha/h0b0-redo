class GuiController {
    constructor() {
        this.buttons = [
            { action: "trackName", text: "",
                x: windowWidth * 0.01,
                y: mobileMode ? windowHeight * 0.95 : windowHeight * 0.95,
                width: 40,
                height: 40
            },
            
            { action: "currentMode", text: "",
                x: windowWidth * 0.01,
                y: mobileMode ? windowHeight * 0.93 : windowHeight * 0.90,
                width: 40,
                height: 40
            },

            { action: "switchMode", text: "♺",
                x: windowWidth * 0.5,
                y: windowHeight * 0.75,
                width: 40,
                height: 40
            },

            // fontVCR is monospaced so textWidth was hardcoded
            { action: "slower", text: "◄◄",
                x: windowWidth * 0.95 - (49 + 10 + textWidth("x1.0") + 10 + 49/2),
                y: windowHeight * 0.95,
                width: 49,
                height: 30
            },

            { action: "trackSpeed", text: "",
                x: windowWidth * 0.95 - (49 + 10) - textWidth("x1.0"),
                y: mobileMode ? windowHeight * 0.95 : windowHeight * 0.95,
                width: 49,
                height: 30
            },

            { action: "faster", text: "►►",
                x: windowWidth * 0.95,
                y: windowHeight * 0.95,
                width: 49,
                height: 30
            }
        ]
    }

    draw() {
        textFont(fontVCR)
        //textFont(fontH0b0)
        stroke(0, 0, 0)
        strokeWeight(2)
        fill(55, 90, 100)

        if (!tracksLoaded) {
            textSize(32)
            text('LOADING (' + (loadIndex + 1) + '/18)', windowWidth * 0.5, windowHeight * 0.8)
        }

        if (tracksLoaded && !open) {
            textSize(32)
            text('h0b0   redo', windowWidth * 0.5, windowHeight * 0.8)

            // "3D" arrow effect (static)
            for (let w = 0; w < 10; w++) {
                text('     ↑     ', windowWidth * 0.5, windowHeight * 0.8 - w)
            }
        }
        if (mobileMode) {
            textSize(12)
        } else {
            textSize(32)
        }

        if (tracksLoaded && open) {
            this.drawMainGui()
        }
    }

    drawMainGui() {

        this.buttons.forEach(button => {

            if (button.action == "trackName") {
                textAlign(LEFT)
                text(musicController.getCurrentTrackName() + "  (" + musicController.getCurrentPlaybackPosition() + ")", button.x, button.y)
            }

            if (button.action == "trackSpeed") {
                textAlign(LEFT)
                let strTrackSpeed = "x" + musicController.getCurrentPlaybackSpeed().toFixed(1)
                text(strTrackSpeed, button.x, button.y)
            }

            if (button.action == "currentMode") {
                textAlign(LEFT)
                text(loopMode ? "looping" : "album mode", button.x, button.y)
            }

            if (button.action == "slower" || button.action == "faster") {
                push()
                // the next if checks if the mouse is hovering
                if (mouseX > button.x - (button.width / 2) && mouseX < button.x + (button.width / 2) && mouseY > button.y - (button.height / 2) && mouseY < button.y + (button.height / 2)) {
                    fill(55, 90, 100)
                    cursor(HAND)
                } else {
                    noFill()
                }

                //changes effects for the rectangle in the slower and faster buttons
                strokeWeight(1)
                stroke(55, 90, 100)
                rect(button.x - (button.width / 2), button.y - (button.height / 2), button.width, button.height, 5)
                pop()
                textSize(20)
            }

            textAlign(CENTER, CENTER)
            text(button.text, button.x, button.y)
        });

        // next comments print current song information for debugging purposes
        // textSize(12)
        // text(JSON.stringify(tracks[musicController.trackPlaying], null, " "), 10, 40)
        // textSize(32)
    }

    handleClicking() {
        this.buttons.forEach(button => {
            if (mouseX > button.x - (button.width / 2) && mouseX < button.x + (button.width / 2) && mouseY > button.y - (button.height / 2) && mouseY < button.y + (button.height / 2)) {
                switch (button.action) {
                    case "switchMode":
                        loopMode = !loopMode
                        musicController.playTrack(musicController.trackPlaying, true)
                        break;
                    case "slower":
                        musicController.decreaseSpeed()
                        break;
                    case "faster":
                        musicController.increaseSpeed()
                        break;
                    default:
                        console.error("Action not yet implemented")
                        break;
                }
            }
        })


        for (let i = 0; i < 18; i++) {
            let d = dist(mouseX, mouseY, verticesPosition[i][0], verticesPosition[i][1])
            if (d < (polygon.vertices[0].diameter / 2)) {
                musicController.playTrack((i + musicController.getTrackNumberPlaying()) % 18)
            }
        }
    }
}
