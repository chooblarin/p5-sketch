let droplets

function setup() {
	createCanvas(windowWidth, windowHeight)
	droplets = []
}

function draw() {
	background(20)

	droplets.forEach((elem, i) => {
		elem.move()
		elem.render()
	})
}

function mousePressed() {
	const p = createVector(mouseX, mouseY)
	const c = color(255)
	const size = 40
	const d = new Droplet(p, c, size)
	droplets.push(d)
}
