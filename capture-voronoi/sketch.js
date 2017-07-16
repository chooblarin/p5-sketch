const width = 640
const height = 480

let svg
let vertices
let voronoi
let capture

function setup() {
	svg = d3.select('svg')
		.attr('width', width)
		.attr('height', height)

	vertices = d3.range(800)
		.map(function (d) {
			return [Math.random() * width, Math.random() * height];
		})
	voronoi = d3.voronoi().extent([
		[-1, -1],
		[width + 1, height + 1]
	])

	capture = createCapture(VIDEO)
	capture.size(width, height)
	capture.hide()
}

function draw() {
	d3.select('g.parent').selectAll('*').remove()

	capture.loadPixels()

	svg.append('g')
		.attr('class', 'polygons')
		.selectAll('path')
		.data(voronoi.polygons(vertices))
		.enter()
		.append("path")
		.attr("d", function (d) {
			return d ? "M" + d.join("L") + "Z" : null;
		})
		.attr("fill", function (d) {
			var sum = d.reduce(function (prev, current) {
				prev[0] += current[0];
				prev[1] += current[1];
				return prev;
			}, [0, 0])

			var l = d.length;
			var x = Math.ceil(sum[0] / l)
			var y = Math.ceil(sum[1] / l)
			var idx = (y * width + x) * 4

			var r = Math.ceil(capture.pixels[idx])
			var g = Math.ceil(capture.pixels[idx + 1])
			var b = Math.ceil(capture.pixels[idx + 2])

			return "rgba(" + r + "," + g + "," + b + " , 1.0)"
		})
}
