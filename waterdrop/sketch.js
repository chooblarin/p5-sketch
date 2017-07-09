let dropletsSystem

function setup() {
	createCanvas(windowWidth, windowHeight)

	dropletsSystem = new DropletsSystem()
}

function draw() {
	background(20)

	dropletsSystem.run()
}

function mousePressed() {
	dropletsSystem.addDroplet(mouseX, mouseY)
}
