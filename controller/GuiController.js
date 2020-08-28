class GuiController {
    constructor() {
        this.buttons = [
            { action: "trackName", text: "", x: windowWidth * 0.01, y: windowHeight * 0.95, width: 40, height: 40 },
            { action: "trackSpeed", text: "", x: windowWidth * 0.01, y: windowHeight * 0.85, width: 40, height: 40 },

            { action: "switchMode", text: "♺", x: windowWidth * 0.5, y: windowHeight * 0.75, width: 40, height: 40 },
            { action: "slower", text: "<<", x: windowWidth * 0.90, y: windowHeight * 0.95, width: 60, height: 40 },
            { action: "faster", text: ">>", x: windowWidth * 0.95, y: windowHeight * 0.95, width: 60, height: 40 }

            //{ action: "play", text: ">", x: windowWidth * 0.5, y: windowHeight * 0.95, width: 40, height: 40 }
        ]
    }

    draw() {
        textFont(fontMono)
        // console.log(windowWidth)
        textSize(32)
        stroke(0, 0, 0)
        strokeWeight(2)
        fill(55, 90, 100)

        if (!tracksLoaded) {
            text('LOADING (' + (loadIndex + 1) + '/18)', windowWidth * 0.5, windowHeight * 0.8)
        }

        if (tracksLoaded && !open) {
            text('h0b0   redo', windowWidth * 0.5, windowHeight * 0.8)

            // "3D" arrow effect (static)
            for (let w = 0; w < 10; w++) {
                text('     ↑     ', windowWidth * 0.5, windowHeight * 0.8 - w)
            }
        }

        if (tracksLoaded && open) {
            this.drawMainGui()
        }
    }

    drawMainGui() {
        textAlign(LEFT)
        text(loopMode ? "looping" : "album mode", windowWidth * 0.01, windowHeight * 0.90)
        this.buttons.forEach(button => {
            // rect(button.x - (button.width / 2), button.y - (button.height / 2), button.width, button.height)
            if (button.action == "trackName") {
                text(musicController.getCurrentTrackName() + "  (" + musicController.getCurrentPlaybackPosition() + ")", button.x, button.y)
            }

            if (button.action == "trackSpeed") {
                textAlign(LEFT)
                text("Playback speed: x" + musicController.getCurrentPlaybackSpeed(), button.x, button.y)
            }

            textAlign(CENTER, CENTER)
            text(button.text, button.x, button.y)
        });

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
                    // case "play":
                    //     musicController.playTrack(musicController.getTrackNumberPlaying())
                    //     break;
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
