var hemiHead;

function preload() {
  hemiHead = loadFont("../assets/font/hemi-head-bd-it.ttf");
}

function setup() {
  createCanvas(640, 360);
  noLoop();
}

function draw() {
  background(0);

  var txt = "DISCO";

  fill(204, 18, 178);
  textAlign(CENTER);
  textSize(150);
  textFont(hemiHead);

  translate(width / 2, height / 2 + 50);

  text(txt, 0, 0);
  filter(BLUR, 14);

  textSize(146);
  fill(255);
  text(txt, 0, 0);
}

function keyPressed() {
  if (32 == keyCode) { // space key is pressed
     saveCanvas('disco', 'png');
  }
}
