class ShaderController {
    constructor() {
        this.gradientPass = createGraphics(windowWidth, windowHeight, WEBGL)
        this.feedbackPass = createGraphics(windowWidth, windowHeight, WEBGL)
        this.feedbackBuffer = createGraphics(windowWidth, windowHeight)        
        this.crtPass = createGraphics(windowWidth, windowHeight, WEBGL)

        noStroke()
        this.gradientPass.noStroke()
        this.feedbackPass.noStroke()
        this.crtPass.noStroke()
    }

    draw() {
        // gradientShader
        this.gradientPass.shader(gradientShader)
        gradientShader.setUniform("u_resolution", [width, height])
        this.gradientPass.rect(0, 0, windowWidth, windowHeight)


        // feedbackShader
        this.feedbackPass.shader(feedbackShader)
        feedbackShader.setUniform('tex0', imgColorNoise)
        if (open) {
            feedbackShader.setUniform('tex1', this.feedbackBuffer)
        } else {
            feedbackShader.setUniform('tex1', imgColorNoise)
        }
        feedbackShader.setUniform('u_resolution', [width, height])
        feedbackShader.setUniform('u_time', millis() / 1000.0)
        feedbackShader.setUniform('u_keyDown', int(keyIsDown(82)))

        feedbackShader.setUniform('u_playbackSpeed', musicController.getCurrentPlaybackSpeed().toFixed(1))
        feedbackShader.setUniform('u_zoom', trackVisualConfigurations[musicController.getTrackNumberPlaying()][0])
        feedbackShader.setUniform('u_rotation', trackVisualConfigurations[musicController.getTrackNumberPlaying()][1])
        feedbackShader.setUniform('u_colorIncrement', trackVisualConfigurations[musicController.getTrackNumberPlaying()][2])
        feedbackShader.setUniform('u_colorTreshold', trackVisualConfigurations[musicController.getTrackNumberPlaying()][3])
        this.feedbackPass.rect(0, 0, windowWidth, windowHeight)

        // draw into the buffer
        this.feedbackBuffer.image(this.feedbackPass, 0, 0, width, height)


        // crtShader
        this.crtPass.shader(crtShader)
        if (!open) {
            // crtShader.setUniform('tex0', this.feedbackPass)
            crtShader.setUniform('tex0', this.gradientPass)
            // crtShader.setUniform('tex0', imgMiraTecnica)
        } else {
            crtShader.setUniform('tex0', this.feedbackPass)
        }
        crtShader.setUniform('u_resolution', [width, height])
        crtShader.setUniform('u_time', millis() / 1000.0)
        this.crtPass.rect(0, 0, windowWidth, windowHeight)


        // displays the shader image
        image(this.crtPass, 0, 0, windowWidth, windowHeight)
    }
}