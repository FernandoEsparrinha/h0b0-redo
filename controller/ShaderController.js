class ShaderController {
    constructor() {
        // shaders require WEBGL mode to work
        this.shaderGraphics = createGraphics(windowWidth, windowHeight, WEBGL)
        this.shaderGraphics.noStroke()

        // this layer will just be a copy of what we just did with the shader
        this.copyLayer = createGraphics(windowWidth, windowHeight)

        // sets the active shader
        this.shaderGraphics.shader(gradientShader)
    }

    draw() {
        // hide the video window that is automatically displayed
        vidGu.hide()

        // gradientShader
        gradientShader.setUniform("u_resolution", [width, height])

        // videoFHueishShader
        videoFHueishShader.setUniform('tex0', imgColorNoise)
        videoFHueishShader.setUniform('tex1', this.copyLayer)
        videoFHueishShader.setUniform("u_resolution", [width, height])
        videoFHueishShader.setUniform('u_time', new Date().getTime())
        videoFHueishShader.setUniform('u_mouseDown', int(mouseIsPressed))

        // rect gives us some geometry on the screen
        this.shaderGraphics.rect(0, 0, windowWidth, windowHeight)

        // draw the shaderlayer into the copy layer
        this.copyLayer.image(this.shaderGraphics, 0, 0, width, height)

        // displays the shader image
        image(this.shaderGraphics, 0, 0, windowWidth, windowHeight)
    }

    changeShader(shaderIndex) {
        switch (shaderIndex) {
            case 1:
                this.shaderGraphics.shader(gradientShader)
                break;
            case 2:
                this.shaderGraphics.shader(videoFHueishShader)
                break;
            default:
                break;
        }
    }
}