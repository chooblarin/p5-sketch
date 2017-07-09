let droplets
let g

function setup() {
	createCanvas(windowWidth, windowHeight)
	droplets = []
	g = createVector(0, 0.02)
}

function draw() {
	background(20)

	droplets = droplets.filter((elem) => !elem.isDead())

	droplets.forEach((elem, i) => {
		elem.applyGravity(g)
		elem.update()
		elem.render()
	})
}

function mousePressed() {
	const p = createVector(mouseX, mouseY)
	const c = color(255)
	const size = random(10, 20)
	const d = new Droplet(p, c, size)
	droplets.push(d)
}
