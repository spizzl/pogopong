let leftscore = 0
let rightscore = 0
var players = []
var net, socket
var gameIsStarted = false
//
var canvSize, playerSize

function setup() {
    canvSize = windowWidth / 2
    playerSize = canvSize / 5
    if (canvSize < 500) canvSize = 500
    createCanvas(canvSize, canvSize)
    //TWO PLAYERS
    players.push(new Paddle(width - 20, height / 2, 0))
    players.push(new Paddle(20, height / 2, 0))
    //THREE PLAYERS
    /*
        players.push(new Paddle(width - playerSize, height / 2 + playerSize, 45))
        players.push(new Paddle(playerSize, height / 2 + playerSize, -45))
        players.push(new Paddle(width / 2, height / 2 - playerSize * 2, 90))
    */
    //
    net = new Network()
    puck = new Puck()
    //
    noLoop()
    angleMode(DEGREES)
    rectMode(CENTER)
    textAlign(CENTER)
}

function startGame() {
    //
    socket = io.connect('http://localhost:3003');
    net.setup()
    //
    var playerName = $('#nameInput')[0].value
    console.log($('#nameInput')[0].value)
    $('#chooseNameField')[0].remove()
    players[0].name = playerName
    net.tellNewPlayer()
    loop()
    gameIsStarted = true
}

function draw() {
    if (gameIsStarted) {
        background(0)
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
}