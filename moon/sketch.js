let min_angle = -1;
let max_angle = 1;
let angle = min_angle;
let upFlag = true;

// let fontRegular, fontItalic, fontBold;
// function preload() {
//   fontRegular = loadFont('STIXGeneral-Regular.otf');
// }

function setup() {
  createCanvas(400, 400, WEBGL);
  resizeCanvas(400, 400);
}

let save = true;

function draw() {
  background(50);
  push();
  //move your mouse to change light direction
  let v = createVector(1, 0, -0.2);
  directionalLight(250, 250, 250, v);
  
  noStroke();
  ambientMaterial(0, 0, 255);
  sphere(50);
  // translate(100, 100);
  rotateX(PI/4-0.1);

  rotateZ(angle);
  if(upFlag){
    angle += 0.01;
  }else{
    angle -= 0.01;
  }
  
  if(angle > max_angle){
    upFlag = 0;
  }else if(angle < min_angle){
    upFlag = 1;
    save = false;
  }
  if(save){
    //saveFrames("Capture_###.png");
  }

  // rotateZ(angle);
  translate(0, -100);
  ambientMaterial(255);
  sphere(30);
  pop();
  
  stroke(255, 255, 0);
  for(var i = -100; i < 100; i+=20){
    line(-190, i, -100, i);
    line(-100-5, i-5, -100, i);
    line(-100-5, i+5, -100, i);
  }

  // textSize(12);
  // textFont(fontRegular);
  // text('Helvetica', 12, 60);
}

