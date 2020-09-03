class ShaderController {
    constructor() {
        this.shaderGraphics = createGraphics(windowWidth, windowHeight, WEBGL)
        this.shaderGraphics.noStroke()

        this.feedbackBuffer = createGraphics(windowWidth, windowHeight)

        // sets the active shader
        this.shaderGraphics.shader(gradientShader)
    }

    draw() {
        // hide the video window that is automatically displayed
        vidGu.hide()

        // gradientShader
        gradientShader.setUniform("u_resolution", [width, height])

        // feedbackShader
        feedbackShader.setUniform('tex0', imgColorNoise)
        feedbackShader.setUniform('tex1', feedbackBuffer)
        feedbackShader.setUniform('u_resolution', [width, height])
        feedbackShader.setUniform('u_time', millis() / 1000.0)
        feedbackShader.setUniform('u_mouseDown', int(mouseIsPressed))

        // rect gives us some geometry on the screen
        this.shaderGraphics.rect(0, 0, windowWidth, windowHeight)

        // draw into the buffer
        feedbackBuffer.image(shaderGraphics, 0, 0, width, height)

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