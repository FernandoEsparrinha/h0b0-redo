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
        vidSky.hide()
        vidWater.hide()

        // gradientShader
        gradientShader.setUniform("u_resolution", [width, height])

        // videoShader
        videoShader.setUniform('tex0', imgVegan)
        videoShader.setUniform("u_resolution", [width, height])
        videoShader.setUniform("u_texResolution", [imgVegan.width, imgVegan.height])

        // videoMirrorShader
        videoMirrorShader.setUniform('tex0', vidSky)

        // videoFeedbackShader
        // videoFeedbackShader.setUniform('tex0', vidGu)
        videoFeedbackShader.setUniform('tex0', vidWater)
        // videoFeedbackShader.setUniform('tex0', vidSky)

        videoFeedbackShader.setUniform('tex1', this.copyLayer)
        videoFeedbackShader.setUniform('u_amplitude', amplitude.getLevel())
        videoFeedbackShader.setUniform('u_time', new Date().getTime())
        videoFeedbackShader.setUniform('u_playbackPosition', musicController.getCurrentPlaybackPosition())
        videoFeedbackShader.setUniform('u_playbackSpeed', musicController.getCurrentPlaybackSpeed())

        videoFeedbackShader.setUniform('u_mouseDown', int(mouseIsPressed))

        // videoClampShader
        videoClampShader.setUniform('tex0', vidSky)
        videoClampShader.setUniform("u_resolution", [width, height])
        videoClampShader.setUniform("u_mouse", [mouseX, map(mouseY, 0, height, height, 0)])

        // videoWormsShader
        videoWormsShader.setUniform('tex0', vidSky)
        videoWormsShader.setUniform('tex1', this.copyLayer)
        videoWormsShader.setUniform("u_resolution", [width, height])
        videoWormsShader.setUniform('u_mouseDown', int(mouseIsPressed))

        // videoKernelShader
        videoKernelShader.setUniform('tex0', vidSky)
        videoKernelShader.setUniform("u_resolution", [width, height])
        videoKernelShader.setUniform('stepSize', [1.0/width, 1.0/height]); // the size of one pixel on the screen
        videoKernelShader.setUniform('dist', 3.0); // how far away to sample from the current pixel - 1 is 1 pixel away

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
                this.shaderGraphics.shader(videoShader)
                break;
            case 3:
                this.shaderGraphics.shader(videoMirrorShader)
                break;
            case 4:
                this.shaderGraphics.shader(videoFeedbackShader)
                break;
            case 5:
                this.shaderGraphics.shader(videoClampShader)
                break;
            case 6:
                this.shaderGraphics.shader(videoWormsShader)
                break;
            case 7:
                this.shaderGraphics.shader(videoKernelShader)
                break;
            default:
                break;
        }
    }
}