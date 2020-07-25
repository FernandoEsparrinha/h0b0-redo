p5.disableFriendlyErrors = true;

function preload() {
    // song = loadSound('assets/SocialConstruct.mp3')
    // song = loadSound('assets/TameImpala.mp3')
}

function setup() {
    createCanvas(windowWidth, windowHeight)
}

function draw() {
    noFill()
    stroke('teal')
    strokeWeight(0.1)


    translate(windowWidth / 2, windowHeight / 2)
    scale(8, 8);
    // translate(windowWidth / 2, windowHeight / 4)
    // scale(12, 12);
    drawPolygon(18);
}

function drawPolygon(n) {
    ang = ((180 * (n - 2)) / n) * (Math.PI / 180)
    alt = Math.tan(ang / 2) * 10

    translate(-10, alt)

    v0 = [0, 0]
    v1 = [20, 0]

    // beginShape()
    // vertex(v0[0], v0[1])
    // vertex(v1[0], v1[1])

    circle(v0[0], v0[1], 10);
    circle(v1[0], v1[1], 10);
    for (i = 0; i < n - 2; i++) {
        x = v1[0] + (v0[0] - v1[0]) * Math.cos(ang) - (v0[1] - v1[1]) * Math.sin(ang)
        y = v1[1] + (v0[0] - v1[0]) * Math.sin(ang) + (v0[1] - v1[1]) * Math.cos(ang)

        // vertex(x, y)
        circle(x, y, 10);
        v0 = v1
        v1 = [x, y]
    }
    // endShape(CLOSE)
}