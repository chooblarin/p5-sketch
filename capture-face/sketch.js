let canvas
let capture

function setup() {
	const w = 640
	const h = 480
	canvas = createCanvas(w, h)
	canvas.position(0, 0)
	capture = createCapture(VIDEO)
	capture.size(w, h)
	capture.position(0, 0)
	capture.hide()
	imageMode(CENTER)
}

function draw() {}
