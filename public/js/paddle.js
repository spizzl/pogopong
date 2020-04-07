class Puck {
  constructor(x, clr, pos, rot) {
    this.x = x
    this.color = clr
    this.position = pos
    this.rotation = rot
  }
  move(xchange) {
    this.x += xchange
  }

  render(x, y) {
    fill(clr)
    ellipse(x, y)
  }
}
