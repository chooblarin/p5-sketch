class Droplet {

  constructor(position, color, radius) {
    this.position = position
    this.color = color
    this.radius = radius

    this.mass = radius / 10.0

    this.velocity = createVector(0, 0)
    this.acceleration = createVector(0, 0)

    this.lifespan = 255.0
    this.xoff = 0.0
  }

  applyGravity(g) {
    this.acceleration.add(p5.Vector.mult(g, this.mass))
  }

  applyForce(f) {
    this.acceleration.add(p5.Vector.div(f, this.mass))
  }

  update() {
    const n = createVector(this.velocity.y * 0.7 * (noise(this.xoff) - 0.5), 0)
    this.velocity.add(this.acceleration)
    this.position.add(p5.Vector.add(this.velocity, n))
    this.acceleration.mult(0)

    this.lifespan -= 1.0
    this.xoff += 0.07
  }

  render() {
    fill(this.color)
    noStroke()
    ellipse(this.position.x, this.position.y, this.radius, this.radius)
  }

  isDead() {
    return this.lifespan < 0.0;
  }
}
