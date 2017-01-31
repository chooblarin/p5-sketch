function paintStroke(length, thickness, strokeColor) {
  let stepLen = length / 4.0;

  // Determines if the stroke is curved. A straight line is 0.
  let tan1 = 0.0;
  let tan2 = 0.0;

  let odds = random(0.0, 1.0);
  if (odds < 0.7) {
    tan1 = random(-length, length);
    tan2 = random(-length, length);
  }

  // Draw a big stroke
  noFill();
  stroke(strokeColor);
  strokeWeight(0.0, thickness);
  curve(tan1, -stepLen * 2, 0, -stepLen, 0, stepLen, tan2, stepLen * 2);

  let z = 1;

  // Draw stroke's details
  for (let num = thickness; 0 < num; num--) {
    let offset = random(-50, 25);

    let newColor = color(red(strokeColor) + offset, green(strokeColor) + offset, blue(strokeColor) + offset, random(80, 255));

    stroke(newColor);
    strokeWeight(random(0, 3));
    curve(tan1, -stepLen * 2, z - thickness / 2, -stepLen * random(0.9, 1.1), z - thickness / 2, stepLen * random(0.9, 1.1), tan2, stepLen * 2);

    z += 1;
  }
}

let c;
let imagePixels;

function setup() {
  let img = document.getElementById('spiderman');
  let canvas = document.createElement('canvas');
  let w = canvas.width = img.width;
  let h = canvas.height = img.height;
  let context = canvas.getContext('2d');
  context.drawImage(img, 0, 0, img.width, img.height);
  imagePixels = context.getImageData(0, 0, w, h).data;

  c = createCanvas(w, h);
}

function draw() {

  translate(width / 2, height / 2);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let odds = random(0, 16000);

      if (odds < 1) {

        var idx = (y * width + x) * 4;
        let r = Math.ceil(imagePixels[idx]);
        let g = Math.ceil(imagePixels[idx + 1]);
        let b = Math.ceil(imagePixels[idx + 2]);

        let pixelColor = color(r, g, b, 80);
        push();

        translate(x - width / 2, y - height / 2);
        rotate(radians(random(-90, 90)));

        if (frameCount < 20) {
          // Big rough stroke
          paintStroke(random(150, 250), random(20, 40), pixelColor);
        } else if (frameCount < 50) {
          // Thick stroke
          paintStroke(random(75, 125), random(8, 12), pixelColor);
        } else if (frameCount < 300) {
          // Small stroke
          paintStroke(random(30, 60), random(1, 4), pixelColor);
        } else if (frameCount < 350) {
          // Big dots
          paintStroke(random(5, 20), random(5, 15), pixelColor);
        } else if (frameCount < 600) {
          // Small dots
          paintStroke(random(1, 10), random(1, 7), pixelColor);
        }

        pop();
      }
    }
  }

  if (700 < frameCount) {
    noLoop();
  }
}

function keyPressed() {
  if (32 == keyCode) { // space key is pressed
    saveCanvas(c, 'myCanvas', 'jpg');
  }
}
