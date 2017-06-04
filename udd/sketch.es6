class Node {

	constructor(origin) {
		this.origin = origin
		this.radius = random(10, 40)
		this.position = createVector(origin.x + this.radius, origin.y)
		this.dir = 0.5 < random() ? 1 : -1 // 1: CW, -1: CCW
		this.offset = random(0, TWO_PI)
		this.theta = 0
	}

	run() {
		this.display()
		this.update()
	}

	update() {
		let x = this.origin.x + this.radius * cos(this.dir * this.theta + this.offset)
		let y = this.origin.y + this.radius * sin(this.dir * this.theta + this.offset)
		this.position.x = x
		this.position.y = y

		this.theta += 0.005
	}

	display() {
		noStroke()
		fill(160)
		ellipse(this.position.x, this.position.y, 8, 8)
	}
}

class GraphSystem {

	constructor() {
		let nodes = []
		for (let i = 0; i < 70; i++) {
			let x = random(0, width)
			let y = random(0, height)
			let origin = createVector(x, y)
			let node = new Node(origin)
			nodes.push(node)
		}
		this.nodes = nodes
		this.connections = []
		this.d = 60
	}

	link() {
		this.connections.length = 0
		for (let i = 0; i < this.nodes.length; i++) {
			for (let j = 0; j < this.nodes.length; j++) {
				if (i <= j) continue;

				let n1 = this.nodes[i]
				let n2 = this.nodes[j]
				let dist = n1.position.dist(n2.position)
				if (dist < this.d) {
					let conn = [n1, n2]
					this.connections.push(conn)
				}
			}
		}
	}
	run() {
		this.link()
		this.display()
		this.update()
	}

	update() {
		this.nodes.forEach(function (node) {
			node.run()
		})
	}

	display() {
		this.connections.forEach(function (conn) {
			let n1 = conn[0]
			let n2 = conn[1]
			stroke(0, 30)
			line(n1.position.x, n1.position.y, n2.position.x, n2.position.y)
		})
	}
}

let graphSystem

function setup() {
	createCanvas(400, 400)
	graphSystem = new GraphSystem()
	graphSystem.link()
}

function draw() {
	background(255)

	graphSystem.run()
}
