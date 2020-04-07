var c1 = [
  40, 0,
  40, 800,
  0.8
]

var c2 = [ //  SQUARE
  40, 0,
  760, 800,
  0.8
]

var c3 = [ // RECT
  50, 650,
  750, 650,
  400, 94
]

var c4 = [// SQUARE
  40, 760
]

function renderplayground(player){
  clear()
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

function setup() {
    console.log( "ready! Setup" );
     f = createCanvas(800, 800)
     f.parent('playground')
     strokeWeight(5);
     (1)
}


function draw() {
}
