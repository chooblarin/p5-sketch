let magnetism = 5.0;
let radius = 1.0;
let damping = 0.95;

class Mover {

  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.ax = 0;
    this.ay = 0;
  }

  runStep() {
    let d = dist(touchX, touchY, this.x, this.y);
    if (3.0 < d) {
      this.ax = magnetism * (touchX - this.x) / (d * d);
      this.ay = magnetism * (touchY - this.y) / (d * d);
    }
    this.vx += this.ax;
    this.vy += this.ay;

    // deceleration
    this.vx *= damping;
    this.vy *= damping;

    this.x += this.vx;
    this.y += this.vy;
  }

  display() {
    let v = dist(0, 0, this.vx, this.vy);
    let r = map(v, 0, 5, 128, 255);
    let g = map(v, 0, 5, 64, 255);
    let b = map(v, 0, 5, 0, 255);
    fill(r, g, b, 12);
    ellipse(this.x, this.y, radius, radius);
  }
}

let movers = [];

function setup() {
  createCanvas(800, 600);
  background(0);
  noStroke();

  let num = 1000;

  for (let i = 0; i < num; i++) {
    let l = random(width / 4);
    let theta = map(i, 0, num, 0, TWO_PI)
    let x = width / 2 + l * cos(theta);
    let y = height / 2 + l * sin(theta);
    let m = new Mover(x, y);
    movers.push(m);
  }

  ellipseMode(RADIUS);
  blendMode(ADD);
}

function draw() {
  fill(0);

  movers.forEach(function (m, idx) {
    m.runStep();
    m.display();
  });
}

function keyPressed() {
  if (keyCode == 32) {
    saveCanvas("1", "png");
  }
}

