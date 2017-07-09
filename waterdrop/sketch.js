let dropletsSystem

function setup() {
	createCanvas(400, 400)

	dropletsSystem = new DropletsSystem()
}

function draw() {
	background(20)

	dropletsSystem.run()

	if (0 == frameCount % 2) {
		dropletsSystem.addDroplet(random(width), random(height))
	}
}

function mousePressed() {
	dropletsSystem.addDroplet(mouseX, mouseY)
}
