class Particle {

	constructor(pos, vel, acc, size, color) {
		this.pos = pos
		this.vel = vel
		this.acc = acc
		this.size = size
		this.color = color

		this.mass = size / 10
		this.decayRate = 0.95
		this.life = 100
		this.maxLife = 100
	}

	applyForce(f) {
		this.acc.add(p5.Vector.div(f, m))
	}

	isAlive() {
		return 0 < this.life
	}

	update() {
		this.vel.add(this.acc)
		this.pos.add(this.vel)

		this.life -= 2
		this.vel.mult(this.decayRate)
		this.acc.mult(0)
	}

	draw() {
		const colR = red(this.color)
		const colG = green(this.color)
		const colB = blue(this.color)
		const colA = 255 * this.life / this.maxLife
		const col = color(colR, colG, colB, colA)

		fill(col)
		push()
		translate(- width / 2, - height / 2)
		translate(this.pos.x, this.pos.y, this.pos.z)
		sphere(this.size)
		// ellipse(this.pos.x, this.pos.y, this.size, this.size)
		pop()
	}
}

let particles = []

function setup() {
	createCanvas(windowWidth, windowHeight, WEBGL);
}

function draw() {
	background(20)

	rotateX(mouseY * 0.005)
	rotateZ(mouseX * 0.005)

	let nextGeneration = []
	for (let particle of particles) {
		particle.draw()
		particle.update()

		if (particle.isAlive()) {
			nextGeneration.push(particle)
		}
	}
	particles = nextGeneration

	if (0 === frameCount % 50) {
		if (particles.length < 100) {
			addParticles()
		}
	}
}

function keyPressed() {
	if (32 === keyCode) {
		addParticles()
	}
}

function addParticles() {
	for (let i = 0; i < 500; i += 1) {
		const size = 10
		const col = randomColor()
		const particle = spawnParticle(size, col)
		particles.push(particle)
	}
}

function spawnParticle(size, col) {
	const x = random(width)
	const y = random(height)
	const z = random(-2000, 200)
	const pos = createVector(x, y, z)
	const vel = p5.Vector.random3D()
	vel.normalize()
	vel.mult(10.0)
	const acc = createVector(0, 0, 0)
	return new Particle(pos, vel, acc, size, col)
}

function randomColor() {
	const r = 255 * Math.random()
	const g = 255 * Math.random()
	const b = 255 * Math.random()
	return color(r, g, b)
}
