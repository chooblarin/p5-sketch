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

function draw() {
	background(50)
	fill(255)
	capture.loadPixels()

	for (let cy = 0; cy < capture.height; cy += 15) {
		for (let cx = 0; cx < capture.width; cx += 15) {
			var offset = ((cy * capture.width) + cx) * 4
			var xpos = (cx / capture.width) * width
			var ypos = (cy / capture.height) * height

			const r = capture.pixels[offset]
			const g = capture.pixels[offset + 1]
			const b = capture.pixels[offset + 2]
			stroke(30)
			fill(color(r, g, b))
			rect(xpos, ypos, 20, 20)
		}
	}
}
