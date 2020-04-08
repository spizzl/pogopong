paddles = []
function setup() {

  f = createCanvas(800, 800)
  f.parent('playground')
  angleMode(DEGREES)
  paddles.push(new Paddle(0, "a", 270, 90))
  paddles.push(new Paddle(1, "b", 150, 30))
  paddles.push(new Paddle(2, "c", 30, 30))
  paddles[0].setPosition(50, 650)
  paddles[1].setPosition(750, 650)
  paddles[2].setPosition(400, 54)

}

function draw(){
  renderplayground(3)
  paddles[0].show()
  paddles[1].show()
  paddles[2].show()




}




function keyPressed() {
    if (key == 'ArrowUp' || key == 'W' || key == 'w') {
        paddles[1].move(5)
        paddles[1].update()
    } else if (key == 'ArrowDown' || key == 'S' || key == 's') {
        paddles[1].move(-5)
    }
    paddles[1].update()
}

function keyReleased() {
    paddles[2].move(0)
}
//


/*
var c3 = [ // RECT
    50, 650,
    750, 650,
    400, 94,
    [45, 315]
]
*/

function renderplayground(player) {
  fill(255)
  rect(0,0,800,800)
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
            //console.log(dist(c3[0], c3[1], c3[2], c3[3]))
            //console.log(dist(c3[2], c3[3], c3[4], c3[5]))
            //console.log(dist(c3[4], c3[5], c3[0], c3[1]))
            break;
        case 4:
            line(c4[0], c4[1], c4[1], c4[1])
            line(c4[1], c4[1], c4[1], c4[0])
            line(c4[1], c4[0], c4[0], c4[0])
            line(c4[0], c4[0], c4[0], c4[1])
            break;
    }
}
