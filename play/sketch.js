var gif;
var c;
var recording = false;

var t = 0;

function setup() {
  c = createCanvas(240, 240);
  setupGif();
}

function draw() {
  background(0);
  noStroke();

  push();
  translate(width / 2, height / 2);
  drawBlob(0, 1, 100);
  drawBlob(100, 2, 95);
  drawBlob(200, 3, 90);
  drawBlob(300, 1, 85);
  drawBlob(400, 2, 80);
  drawBlob(500, 3, 100);
  drawBlob(600, 1, 95);
  drawBlob(700, 2, 90);
  drawBlob(800, 3, 85);
  drawBlob(900, 1, 80);

  fill(255);
  ellipse(0, 0, 140);
  pop();

  t += 2;

  if (recording && frameCount % 2 == 0) {
    gif.addFrame(c.elt, { delay: 1, copy: true });
  }
}

function drawBlob(offset, start, radius) {
  beginShape();
  for (let i = 0; i < 360; i += 20) {
    let n = noise(i * 0.01 + offset, t * 0.01 + offset);
    let r = radius + map(n, 0, 1, -15, 15);

    fill(255, 20);
    let angle = radians(i);
    let phase = -(PI / 2) * start;
    let x = r * cos(angle + phase);
    let y = r * sin(angle + phase);
    curveVertex(x, y);
  }
  endShape(CLOSE);
}

function keyPressed() {
  if (keyCode == 32) {
    saveFrames("", "png", 3, 30);
  }
}

function mousePressed() {
  recording = !recording;
  if (!recording) {
    gif.render();
  }
}

function setupGif() {
  gif = new GIF({
    workers: 2,
    quality: 40
  });

  gif.on('finished', function (blob) {
    window.open(URL.createObjectURL(blob));
    setupGif();
  });
}
