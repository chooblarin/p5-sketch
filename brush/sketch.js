class Brush {

  constructor() {
    this.angle = random(0, TWO_PI);
    this.x = random(0, width);
    this.y = random(0, height);
    this.c = color(random(0, 450), random(0, 450), random(0, 450), 30);

    let components = []
    for (let i = 0; i < 4; i++) {
      components.push(Math.ceil(random(1, 4)));
    }
    this.components = components;
  }

  display() {
    fill(this.c);
    noStroke();

    let r = 0;
    let _x = this.x;
    let _y = this.y;
    let u = random(0.5, 1);

    beginShape();
    for (let a = 0; a < TWO_PI; a += PI / 180) {
      curveVertex(_x, _y);
      let v = random(0.85, 1);
      _x = this.x + r * cos(this.angle + a) * u * v;
      _y = this.y + r * sin(this.angle + a) * u * v;

      this.components.forEach(function (component) {
        r += sin(a * component);
      });
    }
    endShape(CLOSE);
  }
}

let brushes = []

function setup() {
  c = createCanvas(400, 360);

  noLoop();
  for (let i = 0; i < 300; i++) {
    let brush = new Brush();
    brushes.push(brush);
  }
}

function draw() {
  background(255);

  brushes.forEach(function (b) {
    b.display();
  });
  filter(BLUR, 1);
}

function keyPressed() {
  if (keyCode == 32) {
    saveFrames("", "png", 3, 30);
  }
}
