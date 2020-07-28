p5.disableFriendlyErrors = true;

let polygon;

function preload() {
    // song = loadSound('assets/SocialConstruct.mp3')
    // song = loadSound('assets/TameImpala.mp3')

    // loadVideo
}

function setup() {
    createCanvas(windowWidth, windowHeight);

    polygon = new Polygon(0, 0, 400, 18);
}

function draw() {
    clear()
    noFill()
    strokeWeight(1)
    polygon.draw();
}

function keyPressed() {
    if (keyCode === 37) {
        polygon.next()
    } else if (keyCode === 39) {
        polygon.previous()
    }
}
