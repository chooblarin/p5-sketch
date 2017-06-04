let x01, x02, x03, x04, x05, x06, x07, x08, x09, x10, x11, x12

function setup() {
	createCanvas(400, 400)
}

function draw() {

	if (mouseIsPressed) {
		x01 = mouseX
		x02 = mouseY
		x03 = x01
		x04 = x02
		x05 = x01
		x06 = x02
	} else {
		x01 = random(-100, 500)
		x02 = random(-100, 500)
		x03 = random(-100, 500)
		x04 = random(-100, 500)
		x05 = random(-100, 500)
		x06 = random(-100, 500)
	}

	x07 = (200 + x01) / random(1, 10)
	x08 = (200 + x01) / random(1, 10)
	x09 = (200 + x01) / random(1, 10)
	x10 = (200 + x01) / random(1, 10)
	x11 = (200 + x01) / random(1, 10)
	x12 = (200 + x01) / random(1, 10)

	noFill()
	background(0)
	strokeWeight(8)
	stroke(random(150, 255), random(150, 255), 0)
	bezier(200, 200, x07, x08, random(x07, x01), random(x08, x02), x01, x02)
	bezier(200, 200, x09, x10, random(x09, x03), random(x10, x04), x03, x04)
	bezier(200, 200, x11, x12, random(x11, x05), random(x12, x06), x05, x06)
}