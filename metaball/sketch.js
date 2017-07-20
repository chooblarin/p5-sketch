class Metaball {

	constructor(pos, vel) {
		this.pos = pos
		this.vel = vel
		this.radius = 10.0
	}

	update() {
		this.pos.add(this.vel)

		if (width < this.pos.x || this.pos.x < 0) {
			this.vel = createVector(-this.vel.x, this.vel.y)
		}
		if (height < this.pos.y || this.pos.y < 0) {
			this.vel = createVector(this.vel.x, -this.vel.y)
		}
	}

	draw() {
		noStroke()
		fill(0)
		ellipse(this.pos.x, this.pos.y, this.radius * 2, this.radius * 2)
	}
}

let canvas
let metaballs = []

function setup() {
	canvas = createCanvas(480, 320)
	pixelDensity(1)

	for (let i = 0; i < 5; i += 1) {
		const m = createMetaball()
		metaballs.push(m)
	}
}

function draw() {
	clear()

	loadPixels()
	for (let x = 0; x < width; x += 1) {
		for (let y = 0; y < height; y += 1) {
			let sum = 0
			for (let m of metaballs) {
				const d = dist(x, y, m.pos.x, m.pos.y)
				const v = 500 * m.radius / d
				sum += v
			}
			const col = constrain(sum, 0, 255)
			if (220 < col) {
				let idx = (y * width + x) * 4
				pixels[idx + 3] = 180
			}
		}
	}
	updatePixels()

	for (let m of metaballs) {
		m.update()
	}
}

function createMetaball() {
	const pos = createVector(random(width), random(height))
	const vel = p5.Vector.random2D()
	vel.mult(8)
	return new Metaball(pos, vel)
}
