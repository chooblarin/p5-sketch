var t = 0;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(0);
  noStroke();
  fill(255);
  translate(width / 2, height / 2);
  beginShape();
  for (var i = 0; i <= 540; i++) {
    var angle = radians(i);
    var radius = 200;
    curveVertex(radius * cos(angle), radius * sin(angle));

    radius = 90 * noise(i * 0.01, t * 0.005);
    var x = radius * cos(angle);
    var y = radius * sin(angle);
    curveVertex(x, y);
  }
  endShape(CLOSE);

  t += 1;
}

function keyPressed() {
  if (keyCode == 32) {
    saveFrames("", "png", 3, 30);
  }
}
