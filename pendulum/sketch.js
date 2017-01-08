class Pendulum {

  constructor(origin, r) {
    this.origin = origin;
    this.r = r;
    this.angle = PI / 6;
    this.aVelocity = 0;
    this.aAcceleration = 0;
  }

  update() {
    var g = 3.0;
    this.aAcceleration = -1 * g / this.r * sin(this.angle);
    this.aVelocity += this.aAcceleration;
    this.angle += this.aVelocity;
  }

  display() {
    let x = this.r * sin(this.angle);
    let y = this.r * cos(this.angle);
    let position = createVector(x, y);
    position.add(this.origin);

    stroke(0);
    fill(255);
    ellipse(position.x, position.y, 8, 8);
  }
}

let c;
let gif;
let recording = false;

let pendulums = [];

function setup() {
  c = createCanvas(400, 360);
  let n = 20;
  let origin = createVector(width / 2, -40);
  for (let i = 0; i < n; i++) {
    let b = (11 + i) / 20 / TWO_PI;
    let r = 2.8 / (b * b);
    let p = new Pendulum(origin, r);
    pendulums.push(p);
  }

  setupGif();
}

function draw() {
  background(0);
  pendulums.forEach(function (p) {
    p.update();
    p.display();
  });

  if (recording && frameCount % 2 == 0) {
    gif.addFrame(c.elt, { delay: 1, copy: true });
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
