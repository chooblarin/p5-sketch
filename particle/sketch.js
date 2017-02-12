class Particle {

  constructor(position, a) {
    this.position = position;
    this.velocity = createVector(0, 0);
    this.a = a;
    this.s = random(220, 300);
    this.radius = 0.0;
  }

  draw() {
    let x = this.position.x;
    let y = this.position.y;
    let d = dist(x, y, 0, 0);
    this.radius = map(d, 0, 120, 20, 1);
    fill(250, 20, 100, 200);
    ellipse(x, y, this.radius, this.radius);
  }

  drawMiddle() {
    fill(20);
    let size = this.radius - 4.0;
    ellipse(this.position.x, this.position.y, size, size);
  }

  move() {
    let theta = radians(frameCount * this.s / 200);
    let r = sin(theta);
    let vx = r * cos(radians(this.a));
    let vy = r * sin(radians(this.a));
    this.velocity = createVector(vx, vy);
    this.velocity.mult(1.2);
    this.position.add(this.velocity);
  }
}

let gif;
let c;
let recording = false;

let particles = [];

function setup() {
  c = createCanvas(260, 260);
  noStroke();

  for (let i = 0; i < 1000; i++) {
    let par = new Particle(createVector(0, 0), i);
    particles.push(par);
  }

  setupGif();
}

function draw() {
  background(20);
  translate(width / 2, height / 2);

  particles.forEach(function (p) {
    p.draw();
  });
  particles.forEach(function (p) {
    p.drawMiddle();
    p.move();
  });

  if (recording && frameCount % 2 == 0) {
    gif.addFrame(c.elt, {
      delay: 1,
      copy: true
    });
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
    quality: 10
  });

  gif.on('finished', function (blob) {
    window.open(URL.createObjectURL(blob));
    setupGif();
  });
}