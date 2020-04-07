class Puck {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.r = 12
    }
    setPosition(x, y) {
      this.x = x
      this.y = y
    }
    show() {
        fill(255)
        ellipse(this.x, this.y, this.r * 2)
    }
}
