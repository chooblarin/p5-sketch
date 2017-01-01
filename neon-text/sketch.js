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
  textSize(100);
  textFont(hemiHead);

  text(txt, width / 2, height / 2);
  filter(BLUR, 14);

  textSize(96);
  fill(255);
  text(txt, width / 2, height / 2);
}
