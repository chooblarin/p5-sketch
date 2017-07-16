class Fireball {

	constructor(position, velocity, size) {
		this.position = position
		this.velocity = velocity
		this.size = size
		this.acceleration = createVector(0, 0)
		this.radius = size / 2
		this.mass = this.radius / 100
		this.lifespan = 50

		this.colorR = floor(random(255))
		this.colorG = floor(random(255))
		this.colorB = floor(random(255))
		this.colorA = 0.6
	}

	addForce(f) {
		const a = p5.Vector.div(f, this.mass)
		this.acceleration.add(a)
	}

	update() {
		this.velocity.add(this.acceleration)
		this.position.add(this.velocity)
		this.lifespan -= 2
		this.colorA -= 0.015
		this.acceleration.mult(0)
	}

	draw() {
		noStroke()
		const x = this.position.x
		const y = this.position.y
		const gradient = drawingContext.createRadialGradient(x, y, 0.0, x, y, this.radius)
		gradient.addColorStop(0, `rgba(${this.colorR},80,50,${this.colorA})`)
		gradient.addColorStop(1, 'rgba(0,0,0,0')
		drawingContext.fillStyle = gradient
		ellipse(x, y, this.size, this.size)
	}

	isAlive() {
		return 0 < this.lifespan
	}
}

let fireballs = []

function setup() {
	createCanvas(windowWidth, windowHeight)
	blendMode(ADD)
	background(20)
}

function draw() {
	clear()
	background(20)

	for (let i = 0; i < 5; i++) {
		const pos = createPosition()
		const vel = createVector(4 * randomGaussian(), randomGaussian(1, 3))
		const fireball = new Fireball(pos, vel, 200)
		fireballs.push(fireball)
	}

	const copies = [].concat(fireballs)
	copies.reverse()
	copies.forEach(function (fireball) {
		const pos = createPosition()
		const toMouse = p5.Vector.sub(pos, fireball.position)
		toMouse.normalize()
		toMouse.mult(0.5)
		const f = createVector(toMouse.x, -0.3)

		fireball.addForce(f)
		fireball.update()
		fireball.draw()
	})

	fireballs = fireballs.filter(function (fireball) {
		return fireball.isAlive()
	})
}

function createPosition() {
	const posX = mouseX || windowWidth / 2
	const posY = mouseY || windowHeight / 2
	return createVector(posX, posY)
}
