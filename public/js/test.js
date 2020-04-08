var players = []
playerSize = 800 / 7

function setup() {
    console.log("ready! Setup");
    f = createCanvas(800, 800)
    f.parent('playground')
    //
    var movementLine = {
        p1: {
            x: 40,
            y: 0
        },
        p2: {
            x: 40,
            y: 800
        }
    }
    players.push(new Paddle("", "Hallo Hallo Test", movementLine))
    players[0].spawn(random(width), random(height), 0)
    rectMode(CENTER)
    textAlign(CENTER)
}

function draw() {
    background(120)
    //renderplayground(2)
    players[0].update()
    players.forEach(function(player) {
        player.show()
    })
}
class Paddle {
    constructor(id, name, movementLine) {
        this.id = id
        //
        this.h = playerSize
        this.w = this.h / 5
        this.ychange = 0
        this.score = 0
        this.name = name || ""
        this.mov = movementLine
    }
    spawn(x, y, rotation) {
        this.x = this.mov.p1.x
        this.y = this.mov.p1.y
        this.rot = rotation
    }
    update() {
        this.y += this.ychange
        this.y = constrain(this.y, this.h / 2, height - this.h / 2)
    }
    move(direction) {
        if (direction == 1) {
            this.ychange = steps
        } else if (direction == -1) {
            this.ychange = steps
        }
    }
    show() {
        strokeWeight(5)
        stroke(255)
        line(this.mov.p1.x, this.mov.p1.y, this.mov.p2.x, this.mov.p2.y)
        fill(255)
        push()
        translate(this.x, this.y)
        rotate(this.rot)
        rect(0, 0, this.w, this.h)
        textSize(15)
        fill(255)
        rotate(this.rot)
        strokeWeight(0)
        text(this.name, 0, playerSize)
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

function keyReleased() {
    players[0].move(0)
}

function keyPressed() {
    if (key == 'ArrowUp' || key == 'W' || key == 'w') {
        players[0].move(1)
    } else if (key == 'ArrowDown' || key == 'S' || key == 's') {
        players[0].move(-1)
    }
}
//
var c1 = [
    40, 0,
    40, 800
]
var c2 = [ //  SQUARE
    40, 0,
    760, 800
]
var c3 = [ // RECT
    50, 650,
    750, 650,
    400, 94
]
var c4 = [ // SQUARE
    40, 760
]

function renderplayground(player) {
    switch (player) {
        case 1:
            line(c1[0], c1[1], c1[2], c1[3])
            break;
        case 2:
            line(c2[0], c2[1], c2[0], c2[3])
            line(c2[2], c2[1], c2[2], c2[3])
            break;
        case 3:
            line(c3[0], c3[1], c3[2], c3[3])
            line(c3[2], c3[3], c3[4], c3[5])
            line(c3[4], c3[5], c3[0], c3[1])
            console.log(dist(c3[0], c3[0], c3[1], c3[1]))
            console.log(dist(c3[1], c3[1], c3[2], c3[2]))
            console.log(dist(c3[2], c3[2], c3[0], c3[0]))
            break;
        case 4:
            line(c4[0], c4[1], c4[1], c4[1])
            line(c4[1], c4[1], c4[1], c4[0])
            line(c4[1], c4[0], c4[0], c4[0])
            line(c4[0], c4[0], c4[0], c4[1])
            break;
    }
}