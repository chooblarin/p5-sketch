class Particle {

	constructor(position, velocity) {
		this.position = position
		this.velocity = velocity
		this.acceleration = createVector(0, 0)

		this.mass = 1.0
		this.radius = 2.0
		this.maxSpeed = 20.0
		this.maxSpeedVariant = 100.0
	}

	draw() {
		const r = map(this.velocity.mag(), 0, this.maxSpeed, 240, 90)
		const b = map(this.velocity.mag(), 0, this.maxSpeed, 90, 180)
		fill(r, 30, b)
		noStroke()
		ellipse(this.position.x, this.position.y, 2 * this.radius, 2 * this.radius)
	}

	update(volume) {
		let dest
		if (mouseIsPressed) {
			const angle = random(TWO_PI)
			const large = 10000
			dest = createVector(large * cos(angle), large * sin(angle))
		} else {
			dest = createVector(mouseX, mouseY)
		}
		const direction = p5.Vector.sub(dest, this.position)
		direction.normalize()
		const a = p5.Vector.mult(direction, this.maxSpeed)
		this.acceleration.add(a)
		this.velocity.add(this.acceleration)

		const variant = p5.Vector.random2D()
		variant.normalize()
		const cv = constrain(volume, 0, 1.0)
		variant.mult(map(cv, 0, 1.0, 0, this.maxSpeedVariant))
		this.velocity.add(variant)
		this.velocity.limit(this.maxSpeed)
		this.position.add(this.velocity)

		this.acceleration.mult(0)
	}

	applyForce(f) {
		const da = p5.Vector.div(f, this.mass)
		this.acceleration.add(da)
	}
}

let canvas
let sampleSound
let amplitude
let particles = []

function preload() {
	sampleSound = loadSound('../assets/sound/sample.mp3')
}

function setup() {
	const w = 500
	const h = 500
	canvas = createCanvas(w, h)
	blendMode(ADD)

	amplitude = new p5.Amplitude()

	sampleSound.play()

	for (let i = 0; i < 2000; i += 1) {
		const pos = createVector(random(w), random(h))
		const vel = createVector(random(2) - 1.0, random(2) - 1.0)
		vel.normalize()
		const particle = new Particle(pos, vel)
		particles.push(particle)
	}
}

function draw() {
	clear()
	background(63, 26, 127)

	for (let p of particles) {
		const level = amplitude.getLevel()
		p.update(level)
		p.draw()
	}
}
