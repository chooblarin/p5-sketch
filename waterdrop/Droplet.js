class Droplet {

  constructor(position, color, size) {
    this.position = position
    this.color = color
    this.size = size

    this.mass = 1.0

    this.velocity = createVector(0, 0)
    this.acceleration = createVector(0, 0)

    this.lifespan = 255.0
  }

  applyForce(f) {
    this.acceleration.add(p5.Vector.div(f, this.mass))
  }

  update() {
    this.velocity.add(this.acceleration)
    this.position.add(this.velocity)
    this.acceleration.mult(0)

    this.lifespan -= 2.0
  }

  render() {
    fill(this.color)
    noStroke()
    ellipse(this.position.x, this.position.y, this.size, this.size)
  }

  isDead() {
    return this.lifespan < 0.0;
  }
}
