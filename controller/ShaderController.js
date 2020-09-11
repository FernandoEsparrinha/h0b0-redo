class ShaderController {
    constructor() {
        this.gradientPass = createGraphics(windowWidth, windowHeight, WEBGL)
        this.feedbackPass = createGraphics(windowWidth, windowHeight, WEBGL)
        this.feedbackBuffer = createGraphics(windowWidth, windowHeight)
        this.compositePass = createGraphics(windowWidth, windowHeight, WEBGL)
        this.alphaPass = createGraphics(windowWidth, windowHeight, WEBGL)
        this.crtPass = createGraphics(windowWidth, windowHeight, WEBGL)

        noStroke()
        this.gradientPass.noStroke()
        this.feedbackPass.noStroke()
        this.compositePass.noStroke()
        this.alphaPass.noStroke()
        this.crtPass.noStroke()
    }

    draw() {
        this.mX = map(mouseX, 0, width, 0, 100)
        this.mY = map(mouseY, 0, height, 0, 100)


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
        feedbackShader.setUniform('u_keyDown', int(keyIsDown(82)))

        feedbackShader.setUniform('u_bass', map(musicController.bass, 130, 255, 0., 1.))
        feedbackShader.setUniform('u_lowMid', map(musicController.lowMid, 130, 255, 0., 1.))
        feedbackShader.setUniform('u_treble', map(musicController.treble, 40, 120, 0., 1.))

        feedbackShader.setUniform('u_playbackSpeed', musicController.getCurrentPlaybackSpeed().toFixed(1))
        feedbackShader.setUniform('u_zoom', trackVisualConfigurations[musicController.getTrackNumberPlaying()][0])
        feedbackShader.setUniform('u_rotation', trackVisualConfigurations[musicController.getTrackNumberPlaying()][1])
        feedbackShader.setUniform('u_colorIncrement', trackVisualConfigurations[musicController.getTrackNumberPlaying()][2])
        feedbackShader.setUniform('u_colorTreshold', trackVisualConfigurations[musicController.getTrackNumberPlaying()][3])
        this.feedbackPass.rect(0, 0, windowWidth, windowHeight)

        // draw into the buffer
        this.feedbackBuffer.image(this.feedbackPass, 0, 0, width, height)


        // compositeShader
        // this.compositePass.shader(compositeShader)
        // compositeShader.setUniform('tex0', this.feedbackPass)
        // compositeShader.setUniform('tex1', canvasPass)
        // compositeShader.setUniform('tex0_res', [width, height])
        // compositeShader.setUniform('tex1_res', [width, height])
        // compositeShader.setUniform("u_resolution", [width, height])
        // this.compositePass.rect(0, 0, windowWidth, windowHeight)


        // alphaShader
        // this.alphaPass.shader(alphaShader)
        // alphaShader.setUniform('tex0', this.feedbackPass)
        // alphaShader.setUniform('tex1', canvasPass)
        // alphaShader.setUniform("u_resolution", [width, height])
        // alphaShader.setUniform('u_time', millis() / 1000.0)
        // this.alphaPass.rect(0, 0, windowWidth, windowHeight)


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