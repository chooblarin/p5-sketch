let beeSystem = []

class Bee {

  constructor(fieldWidth, fieldHeight) {
    this.x = random(-fieldWidth / 2, fieldWidth / 2);
    this.y = random(-fieldHeight / 2, fieldHeight / 2);
    this.z = ceil(random(-255, 255));

    this.ax = random(0, TWO_PI);
    this.ay = random(0, TWO_PI);
    this.az = random(0, TWO_PI);

    this.ix = random(0.001, 0.005);
    this.iy = random(0.001, 0.005);
    this.iz = random(0.001, 0.005);

    this.c = ceil(random(0, /* max color */ 768));

    this.distance = 1024;
  }

  buzz() {
    // Rotate around the Z-axis
    let rx1 = this.x * cos(this.az) - this.y * sin(this.az);
    let ry1 = this.x * sin(this.az) + this.y * cos(this.az);
    let rz1 = this.z;

    // Rotate around the Y-axis
    let rx2 = rx1 * cos(this.ay) - rz1 * sin(this.ay);
    let ry2 = ry1;
    let rz2 = rx1 * sin(this.ay) + rz1 * cos(this.ay);

    // Rotate around the X-axis
    let rx3 = rx2;
    let ry3 = ry2 * cos(this.ax) - rz2 * sin(this.ax);
    let rz3 = ry2 * sin(this.ax) + rz2 * cos(this.ax);

    // Perspective projection
    let sx = rx3 * 512 / (rz3 + this.distance) + width / 2;
    let sy = ry3 * 512 / (rz3 + this.distance) + height / 2;

    if (2 <= sx && sx < width - 1 && 2 <= sy && sy < height - 1) {
      beeSystem[ceil(sx + sy * width)] = this.c;
    }

    this.ax += this.ix;
    this.ay += this.iy;
    this.az += this.iz;
  }
}

let bees = []
let numOfBuzzer = 1;

function setup() {
  createCanvas(500, 500);
  background(0);

  let size = width * height;
  for (let i = 0; i < size; i++) {
    beeSystem.push(0);
  }

  for (let i = 0; i < 500; i++) {
    bees.push(new Bee(width, height));
  }
}

function draw() {
  loadPixels();
  for (let i = 0; i < numOfBuzzer; i++) {
    bees[i].buzz();
    bees[i].buzz();
    bees[i].buzz();
    bees[i].buzz();
  }

  if (numOfBuzzer < bees.length) {
    numOfBuzzer++;
  }
  for (let i = 1; i < height - 1; i++) {
    let w = i * width;
    for (let j = 1; j < width - 1; j++) {
      let idx = ceil(w + j);
      // print(idx)
      beeSystem[idx] = beeSystem[idx - (width + 1)] + beeSystem[idx - width] + beeSystem[idx - (width - 1)];
      beeSystem[idx] += beeSystem[idx - 1] + beeSystem[idx + 1];
      beeSystem[idx] += beeSystem[idx + (width + 1)] + beeSystem[idx + width] + beeSystem[idx + (width - 1)];
      beeSystem[idx] = beeSystem[idx] >> 3;
      pixels[idx] = color(0, beeSystem[idx] / 2, beeSystem[idx]);
    }
  }
  updatePixels();
}

function keyPressed() {
  if (keyCode == 32) {
    saveFrames("", "png", 3, 30);
  }
}
