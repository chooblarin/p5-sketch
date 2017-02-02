function randomColor() {
  let r = floor(random(0, 5));
  if (0 == r) {
    return color('#05CDE5');
  } else if (1 == r) {
    return color('#FFB803');
  } else if (2 == r) {
    return color('#FF035B');
  } else if (3 == r) {
    return color('#3D3E3E');
  } else {
    return color('#D60FFF');
  }
}

class Dot {

  constructor(pos) {
    this.position = pos;

    let vx = random(-0.05, 0.05);
    let vy = random(-0.05, 0.05);
    this.velocity = createVector(vx, vy);
    this.c = randomColor();
  }

  display() {
    fill(this.c);
    noStroke();
    ellipse(this.position.x, this.position.y, 2.0, 2.0);
  }

  runStep() {
    if (this.position.x <= 0 || width <= this.position.x) {
      this.velocity.x *= -1;
    }
    if (this.position.y <= 0 || height <= this.position.y) {
      this.velocity.y *= -1;
    }
    this.position.add(this.velocity);
  }
}

let dots = [];
let distance = 70.0;

function setup() {
  createCanvas(400, 400);
  for (let i = 0; i < 80; i++) {
    let x = width / 2 + random(-150, 150);
    let y = height / 2 + random(-150, 150);
    let pos = createVector(x, y);
    let d = new Dot(pos);
    dots.push(d);
  }
  smooth();
}

function draw() {
  background(0);
  fill(0);

  dots.forEach(function (dot, idx) {
    dot.display();
    dot.runStep();

    for (let i = idx + 1; i < dots.length; i++) {
      let opp1 = dots[i];
      opp1.runStep();
      let d1 = dist(dot.position.x, dot.position.y, opp1.position.x, opp1.position.y);
      if (d1 < distance) {
        for (let j = i + 1; j < dots.length; j++) {
          let opp2 = dots[j];
          opp2.runStep();
          fill(red(opp2.c), green(opp2.c), blue(opp2.c), 50);
          noStroke();
          let d2 = dist(opp2.position.x, opp2.position.y, opp1.position.x, opp1.position.y);
          if (d2 < distance) {
            beginShape();
            vertex(opp2.position.x, opp2.position.y);
            vertex(opp1.position.x, opp1.position.y);
            vertex(dot.position.x, dot.position.y);
            endShape();
          }
        }
      }
    }
  });
}
