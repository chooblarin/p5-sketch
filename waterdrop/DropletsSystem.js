class DropletsSystem {

  constructor() {
    this.droplets = []
    this.g = createVector(0, 0.02)
  }

  run() {

    this.droplets = this.droplets.filter((elem) => !elem.isDead())

    this.droplets.forEach((elem, i) => {
      elem.applyGravity(this.g)
      elem.update()
      elem.render()
    })

    this.checkCompounds()
  }

  createCompound(d1, d2) {
    const x1 = d1.position.x
    const y1 = d1.position.y
    const r1 = d1.radius
    const x2 = d2.position.x
    const y2 = d2.position.y
    const r2 = d2.radius

    const x = (r2 * x1 + r1 * x2) / (r1 + r2)
    const y = (r2 * y1 + r1 * y2) / (r1 + r2)
    const r = Math.min((r1 + r2) * 0.8, 12)
    return new Droplet(createVector(x, y), color(95, 204, 255, 100), r)
  }

  checkCollision(d1, d2) {
    const x1 = d1.position.x
    const y1 = d1.position.y
    const r1 = d1.radius
    const x2 = d2.position.x
    const y2 = d2.position.y
    const r2 = d2.radius
    return dist(x1, y1, x2, y2) <= r1 + r2
  }

  checkCompounds() {

    if (this.droplets.length < 2) {
      return
    }

    const dropouts = new Set()
    const suvivors = new Set()

    const compounds = []

    for (let i = 0; i < this.droplets.length; i++) {
      for (let j = 0; j < this.droplets.length; j++) {
        if (i <= j) {
          break
        }

        const d1 = this.droplets[i]
        const d2 = this.droplets[j]

        if (this.checkCollision(d1, d2)) {
          dropouts.add(d1)
          dropouts.add(d2)
          compounds.push([d1, d2])
        } else {
          suvivors.add(d1)
          suvivors.add(d2)
        }
      }
    }

    dropouts.forEach((val) => {
      suvivors.delete(val)
    })

    for (let elem of compounds) {
      const compound = this.createCompound(elem[0], elem[1])
      suvivors.add(compound)
      break // workaround to avoid infinite loop
    }

    this.droplets = Array.from(suvivors)
  }

  addDroplet(x, y) {
    const p = createVector(x, y)
    const c = color(95, 204, 255, 100)
    const radius = random(3, 7)
    const d = new Droplet(p, c, radius)
    this.droplets.push(d)
  }
}
