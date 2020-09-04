class ShaderController {
    constructor() {
        this.shaderGraphics = createGraphics(windowWidth, windowHeight, WEBGL)
        this.shaderGraphics.noStroke()

        this.feedbackBuffer = createGraphics(windowWidth, windowHeight)

        // sets the active shader
        this.shaderGraphics.shader(gradientShader)
    }

    draw() {
        this.mX = map(mouseX, 0, width, 0, 100)
        this.mY = map(mouseY, 0, height, 0, 100)

        // hide the video window that is automatically displayed
        vidGu.hide()

        // gradientShader
        gradientShader.setUniform("u_resolution", [width, height])

        // feedbackShader
        feedbackShader.setUniform('tex0', imgColorNoise)
        feedbackShader.setUniform('tex1', this.feedbackBuffer)
        feedbackShader.setUniform('u_resolution', [width, height])
        feedbackShader.setUniform('u_time', millis() / 1000.0)
        feedbackShader.setUniform('u_mouseDown', int(mouseIsPressed))
        feedbackShader.setUniform('u_mouse', [this.mX, this.mY])

        // rect gives us some geometry on the screen
        this.shaderGraphics.rect(0, 0, windowWidth, windowHeight)

        // draw into the buffer
        this.feedbackBuffer.image(this.shaderGraphics, 0, 0, width, height)

        // displays the shader image
        image(this.shaderGraphics, 0, 0, windowWidth, windowHeight)
    }

    changeShader(shaderIndex) {
        switch (shaderIndex) {
            case 1:
                this.shaderGraphics.shader(gradientShader)
                break;
            case 2:
                this.shaderGraphics.shader(feedbackShader)
                break;
            default:
                break;
        }
    }
}