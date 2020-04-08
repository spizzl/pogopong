class Paddle {
    constructor(id, name) {
        this.id = id
        //
        this.h = 800 / 5
        this.w = this.h / 5
        this.score = 0;
        this.name = name || ""
        this.mov
        this.ychange = 0
    }
    spawn() {
        this.x = this.mov.p2.x
        this.y = this.mov.p2.y / 2
    }
    setPosition(x, y) {
        this.x = x
        this.y = y
    }
    update() {
        this.y += this.ychange
        this.y = constrain(this.y, this.h / 2, height - this.h / 2)
    }
    move(steps) {
        this.ychange = steps
    }
    show() {
        fill(255)
        push()
        translate(this.x, this.y)
        rotate(this.rot)
        rect(0, 0, this.w, this.h)
        textSize(30)
        fill(255)
        rotate(this.rot)
        text(this.name, 0, playerSize * 0.6)
        pop()
    }
    showscore() {
        fill(255)
        push()
        translate(this.x, this.y)
        textSize(32)
        text(this.score, 10, 10)
        pop()
    }
}