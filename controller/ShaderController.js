class ShaderController {
    constructor() {
        // this.shaderGraphics = createGraphics(windowWidth, windowHeight, WEBGL)
        // this.shaderGraphics.noStroke()

        this.gradientPass = createGraphics(windowWidth, windowHeight, WEBGL)
        this.feedbackPass = createGraphics(windowWidth, windowHeight, WEBGL)
        this.crtPass = createGraphics(windowWidth, windowHeight, WEBGL)
        this.feedbackBuffer = createGraphics(windowWidth, windowHeight)

        noStroke()
        this.gradientPass.noStroke()
        this.feedbackPass.noStroke()
        this.crtPass.noStroke()

    }

    draw() {
        this.mX = map(mouseX, 0, width, 0, 100)
        this.mY = map(mouseY, 0, height, 0, 100)

        // hide the video window that is automatically displayed
        vidGu.hide()

        // gradientShader
        this.gradientPass.shader(gradientShader)
        gradientShader.setUniform("u_resolution", [width, height])
        this.gradientPass.rect(0, 0, windowWidth, windowHeight)

        // feedbackShader
        this.feedbackPass.shader(feedbackShader)
        feedbackShader.setUniform('tex0', imgColorNoise)
        feedbackShader.setUniform('tex1', this.feedbackBuffer)
        feedbackShader.setUniform('u_resolution', [width, height])
        feedbackShader.setUniform('u_time', millis() / 1000.0)
        feedbackShader.setUniform('u_mouseDown', int(keyIsDown(82)))
        feedbackShader.setUniform('u_mouse', [this.mX, this.mY])
        feedbackShader.setUniform('u_playbackSpeed', musicController.getCurrentPlaybackSpeed().toFixed(1))
        feedbackShader.setUniform('u_amplitudeValue', amplitude.getLevel())
        feedbackShader.setUniform('u_zoom', trackVisualConfigurations[musicController.getTrackNumberPlaying()][0])
        feedbackShader.setUniform('u_colorIncrement', trackVisualConfigurations[musicController.getTrackNumberPlaying()][1])
        feedbackShader.setUniform('u_colorTreshold', trackVisualConfigurations[musicController.getTrackNumberPlaying()][2])
        this.feedbackPass.rect(0, 0, windowWidth, windowHeight)

        // draw into the buffer
        this.feedbackBuffer.image(this.feedbackPass, 0, 0, width, height)

        // crtShader
        this.crtPass.shader(crtShader)
        if (!open) {
            crtShader.setUniform('tex0', this.gradientPass)
        } else {
            crtShader.setUniform('tex0', this.feedbackPass)
        }
        crtShader.setUniform('u_resolution', [width, height])
        crtShader.setUniform('u_time', millis() / 1000.0)
        crtShader.setUniform('u_mouseDown', int(mouseIsPressed))
        crtShader.setUniform('u_mouse', [this.mX, this.mY])
        this.crtPass.rect(0, 0, windowWidth, windowHeight)

        // displays the shader image
        image(this.crtPass, 0, 0, windowWidth, windowHeight)
    }

    // changeShader(shaderIndex) {
    //     switch (shaderIndex) {
    //         case 1:
    //             this.shaderGraphics.shader(gradientShader)
    //             break;
    //         case 2:
    //             this.shaderGraphics.shader(feedbackShader)
    //             break;
    //         case 3:
    //             this.shaderGraphics.shader(crtShader)
    //             break;
    //         default:
    //             break;
    //     }
    // }
}