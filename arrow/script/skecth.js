"using strict";
const MIN_LEN_RATE = 0.8;
const MAX_LEN_RATE = 1;
const MIN_LIVE_LEN_RATE = 0.6;
const LEN_DECAY = 0.99;
const CENTER_DIST_DECAY = 0.95;
const MAX_RADIUS_RATE = 0.8;
const MIN_RADIUS_RATE = 0.5;
const MAX_NUM = 300;

const RANDOM_P = 0.8;

let nx = 0, ny = 0;
let idx = 1000;
let idy = 0;

let START_COLOR;
let END_COLOR;

let plist = [];

function setup() {
    START_COLOR = color("#6495ED");
    END_COLOR = color("#FF8C00");

    let myCanvas = createCanvas(500, 500);
    myCanvas.parent('myContainer');
    // p = new MovingArrow(150, 10, PI/4, width, height, 150);
}

function draw() {
    let radius = Math.sqrt(Math.pow(width/2, 2) + Math.pow(height/2, 2));
    let toPixel = (x) => x * radius;

    background(255);
    
    nx = noise(idx) * width;
    ny = noise(idy) * height;

    idx += 0.001;
    idy += 0.001;

    plist.forEach((x) => x.update(nx, ny));

    plist = plist.filter((x) => x.alive());

    plist.forEach((x) => x.display());

    if((plist.length < MAX_NUM) && (random() < RANDOM_P)){
        plist.push(new MovingArrow(
            random(toPixel(MIN_LEN_RATE), toPixel(MAX_LEN_RATE)),
            random(toPixel(MIN_RADIUS_RATE), toPixel(MAX_RADIUS_RATE)),
            random(0, TWO_PI),
            nx, ny,
            radius
        ));
    }
}


let MovingArrow = function (arrow_len, center_dist, angle, cx, cy, radius) {
    this.arrow_len = arrow_len;
    this.center_dist = center_dist;
    this.angle = angle;
    this.cx = cx;
    this.cy = cy;
    this.radius = radius;
    this.arrow_color = lerpColor(START_COLOR, END_COLOR, this.center_dist / this.radius);

    this.update = function (cx, cy) {
        this.cx = cx;
        this.cy = cy;
        this.arrow_len *= LEN_DECAY;
        this.center_dist *= CENTER_DIST_DECAY;
        this.arrow_color = lerpColor(START_COLOR, END_COLOR, this.center_dist / this.radius);
    }

    this.display = function () {
        push();
        translate(this.cx, this.cy);
        rotate(this.angle);
        strokeWeight(2);
        stroke(this.arrow_color);
        line(0, this.center_dist, 0, this.center_dist + this.arrow_len);
        pop();
    }

    this.len = () => this.arrow_len;

    this.alive = () => !(this.len() < MIN_LIVE_LEN_RATE * this.radius);
}

function mousePressed() {
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    let fs = fullscreen();
    fullscreen(!fs);
    // fullscreen();
  }
}
