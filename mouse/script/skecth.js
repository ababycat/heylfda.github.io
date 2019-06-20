"using strict";
const PARTICAL_NUM = 1000;
const RADIUS = 20;
const TRACKED_TIME = 100;
const RANDOM_NOISE = 2;
const TIME_TO_BOMB = 10;
const IN_DISERED_DISTANCE = 50;
const PATTEN_CHANGE_STEP = 300;
let p_list = [];

let nx = 0, ny = 0;
let idx = 1000;
let idy = 0;
let move_step = 0.005;


let sqrt_r = (dx, dy) => Math.sqrt(Math.pow(dx, 2)+Math.pow(dy, 2));

function setup() {
    // let myCanvas = createCanvas(500, 500);
    let myCanvas = createCanvas(displayWidth, displayHeight);
    myCanvas.parent('myContainer');
    for (let i = 0; i < PARTICAL_NUM; ++i) {
        p_list[i] = new Partical(random(0, width), random(0, height), RADIUS)
    }
}


function draw() {
    background(0);
    nx = noise(idx) * width;
    ny = noise(idy) * height;
    idx += move_step;
    idy += move_step;

    p_list.forEach((x) => x.update(nx, ny));
    p_list.forEach((x) => x.dispaly());
}


let Partical = function (cx, cy, radius) {
    this.center = createVector(cx, cy);
    this.veclocity = createVector(0, 0);
    this.radius = radius;
    this.color = 0;
    this.distancen = 0;
    this.distance_vec = null;
    this.time_in_disired = 0;
    this.step_clock = 0;

    this.dispaly = function () {
        noStroke();
        fill(255, this.color);
        circle(this.center.x, this.center.y, this.radius);
    }

    this.update = function (mx, my) {
        let dx, dy;
        dx = this.center.x - mx;
        dy = this.center.y - my;
        this.distance_vec = createVector(dx, dy);
        this.distance = sqrt_r(dx, dy);

        if(this.in_disired()){
            dx = -random(5, 10) * dx;
            dy = -random(5, 10) * dy;
            // console.log(true);
        }
        
        this.veclocity.x = -dx / TRACKED_TIME + random(-RANDOM_NOISE, RANDOM_NOISE);
        this.veclocity.y = -dy / TRACKED_TIME + random(-RANDOM_NOISE, RANDOM_NOISE);
        
        this.color = 255*Math.pow((1 -  this.distance/ sqrt_r(width, height)), 12);
        this.center.add(this.veclocity);
    }

    this.in_disired = function () {
        ++this.step_clock;
        // text(this.step_clock.toString(), 10, 30);
        if(this.step_clock <= PATTEN_CHANGE_STEP){
            return this.distance < IN_DISERED_DISTANCE; //random(IN_DISERED_DISTANCE*0.8, IN_DISERED_DISTANCE*1.2);
        }else if(this.step_clock <= 2*PATTEN_CHANGE_STEP){
            return (Math.abs(this.distance_vec.x) < IN_DISERED_DISTANCE*0.8) && (Math.abs(this.distance_vec.y) < IN_DISERED_DISTANCE*0.8);
        }else{
            this.step_clock = 0;
            return this.distance < IN_DISERED_DISTANCE;
        }
    };
}


function mousePressed() {
    if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
      let fs = fullscreen();
      fullscreen(!fs);
      // fullscreen();
    }
  }