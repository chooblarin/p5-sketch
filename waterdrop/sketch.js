let droplets
let gravity

function setup() {
	createCanvas(windowWidth, windowHeight)
	droplets = []
	gravity = createVector(0, 0.1)
}

function draw() {
	background(20)

	droplets = droplets.filter((elem) => !elem.isDead())

	droplets.forEach((elem, i) => {
		elem.applyForce(gravity)
		elem.update()
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
