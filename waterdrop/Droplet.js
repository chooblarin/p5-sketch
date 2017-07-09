class Droplet {

  constructor(position, color, size) {
    this.position = position
    this.color = color
    this.size = size

    this.velocity = createVector(0, 0)
    this.acceleration = createVector(0, 0)
  }

  render() {
    fill(0, 80, 200, 100)
    noStroke()
    ellipse(this.position.x, this.position.y, this.size, this.size)
  }

  move() {
    const gravity = createVector(0, 0.1)

    this.position.add(this.velocity)
    this.velocity.add(gravity)
  }
}
