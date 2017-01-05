function setup() {
  createCanvas(400, 400);
}

var time = 0;
var cellSize = 4;

function draw() {
  background(0);

  noStroke();

  for (let x = 0; x < width; x += cellSize) {
    for (let y = 0; y < height; y += cellSize) {
      let v = 0.0;

      let sx = (x - width / 2.0) / width;
      let sy = (y - height / 2.0) / height;

      v += sin(sx + time);
      v += sin(10.0 * (sx * sin(time / 2) + sy * cos(time / 3)) + time)

      var cx = sx + 0.5 * sin(time / 5.0);
      var cy = sy + 0.5 * cos(time / 3.0);
      v += sin(sqrt(100.0 * (cx * cx + cy * cy) + 1.0) + time);

      v /= 3.0

      var r = map(sin(v * PI), -1, 1, 0, 255);
      var g = map(cos(v * PI), -1, 1, 0, 255);

      fill(r, g, 100);
      rect(x, y, cellSize, cellSize);
    }
  }
  time += 0.5;
}

function keyPressed() {
  if (32 == keyCode) { // space key is pressed
  }
}
