"using strict";
const MIN_LIVE_LEN = 120.0;

const noiseScale = 0.02;
let x=0, y=0;

let idx = 1000;
let idy = 0;


let MovingArrow = function(arrow_len, center_dist, angle, cx, cy, radius){
    this.arrow_len = arrow_len;
    this.center_dist = center_dist;
    this.angle = angle;
    this.cx=cx;
    this.cy=cy;
    this.radius=radius;

    console.log(this.arrow_len);
    this.update = function(){

    }

    this.display = function(){
        push();
        fill(255, 0, 255);
        ellipse(10, 10, 50, 50);
        pop();
    }

    this.len = function(){
        return this.arrow_len;
    }

    this.alive = () => !(this.len() < MIN_LIVE_LEN);
}

let p;

function setup() {
    let myCanvas = createCanvas(300, 300);
    myCanvas.parent('myContainer');
    p = new MovingArrow(1, 2, 3, 4, 5, 6);
}

function draw() {
    
    
    background(0);
  
    x = noise(idx) * width;
    y = noise(idy) * height; 
    
    idx += 0.01;
    idy += 0.01;
    
    circle(x, y, 55);
    ellipse(mouseX, mouseY, 50, 50);

    // ++p;
    // console.log(p);
    p.display();
}


// function mousePressed() {
//   if (mouseX > 0 && mouseX < 100 && mouseY > 0 && mouseY < 100) {
//     let fs = fullscreen();
//     fullscreen(!fs);
//   }
// }


