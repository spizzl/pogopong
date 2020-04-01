
let leftscore = 0
let rightscore = 0
var players = []
var net, socket

function startGame() {
    console.log("yass")
    console.log($('#nameInput').text)
    noLoop()
    var canvSize = windowWidth / 2
    var playerSize = canvSize / 5
    if (canvSize < 500) canvSize = 500
    createCanvas(canvSize, canvSize)
    //
    angleMode(DEGREES)
    rectMode(CENTER)
    //ding = loadSound('data/ding.mp3')
    puck = new Puck()
    //
    net = new Network()
    socket = io.connect('http://localhost:3003');
    net.setup()
    //
    //TWO PLAYERS
    players.push(new Paddle(width - 20, height / 2, 0))
    players.push(new Paddle(20, height / 2, 0))
    //
    //THREE PLAYERS
    /*players.push(new Paddle(width - playerSize, height / 2 + playerSize, 45))
    players.push(new Paddle(playerSize, height / 2 + playerSize, -45))
    players.push(new Paddle(width / 2, height / 2 - playerSize * 2, 90))
*/
    //
    noLoop()
}

function setup() {}

function draw() {
    background(20)
    players[0].update()
    net.sendPlayer()
    net.receivePlayers()
    net.receivePuck()
    players.forEach(function(player) {
        player.show()
    })
    puck.show()
    //showscore()
}