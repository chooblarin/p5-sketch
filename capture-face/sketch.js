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

let leftEyeFires = []
let rightEyeFires = []

let canvas
let capture
let clmtracker

function setup() {
	const w = 640
	const h = 480
	canvas = createCanvas(w, h)
	canvas.position(0, 0)
	blendMode(ADD)

	capture = createCapture(VIDEO)
	capture.size(w, h)
	capture.position(0, 0)
	imageMode(MULTIPLY)
	capture.hide()

	clmtracker = new clm.tracker()
	clmtracker.init()
	clmtracker.start(capture.elt)
}

function draw() {
	clear()
	background(30)
	capture.loadPixels()

	fill(255)
	for (let cy = 0; cy < capture.height; cy += 10) {
		for (let cx = 0; cx < capture.width; cx += 10) {
			var offset = ((cy * capture.width) + cx) * 4
			var xpos = (cx / capture.width) * width
			var ypos = (cy / capture.height) * height
			stroke(30)
			rect(xpos, ypos, 15, 15 * capture.pixels[offset + 1] / 255)
		}
	}

	addBallsTo(leftEyeFires, 'left')
	addBallsTo(rightEyeFires, 'right')
	updateBalls(leftEyeFires, 'left')
	updateBalls(rightEyeFires, 'right')

	leftEyeFires = leftEyeFires.filter(function (fireball) {
		return fireball.isAlive()
	})
	rightEyeFires = rightEyeFires.filter(function (fireball) {
		return fireball.isAlive()
	})
}

function addBallsTo(array, which) {
	for (let i = 0; i < 5; i++) {
		const pos = which === 'right' ? createRightEyePosition() : createLeftEyePosition()
		if (pos) {
			const vel = createVector(4 * randomGaussian(), randomGaussian(1, 3))
			const fireball = new Fireball(pos, vel, 50)
			array.push(fireball)
		}
	}
}

function updateBalls(array, which) {
	const copies = [].concat(array)
	copies.reverse()
	copies.forEach(function (fireball) {
		const pos = which === 'right' ? createRightEyePosition() : createLeftEyePosition()
		if (pos) {
			const toMouse = p5.Vector.sub(pos, fireball.position)
			toMouse.normalize()
			toMouse.mult(0.5)
			const f = createVector(toMouse.x, -0.3)
			fireball.addForce(f)
		}
		fireball.update()
		fireball.draw()
	})
}

function createLeftEyePosition() {
	const curretPosition = clmtracker.getCurrentPosition()
	if (curretPosition) {
		return createVector(curretPosition[32][0], curretPosition[32][1])
	} else {
		return null
	}
}

function createRightEyePosition() {
	const curretPosition = clmtracker.getCurrentPosition()
	if (curretPosition) {
		return createVector(curretPosition[27][0], curretPosition[27][1])
	} else {
		return null
	}
}
