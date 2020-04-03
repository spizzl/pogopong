let leftscore = 0
let rightscore = 0
var players = []
var net, socket
var gameIsStarted = false
var updateSpeed = 1000 //in milliseconds
var dialog = new UserDialog()

//
var canvSize, playerSize

function clog(msg) {
    console.log(msg);
}

function setup() {
    console.log( "ready!" );
    canvSize = windowWidth / 2
    playerSize = canvSize / 5
    if (canvSize < 500) canvSize = 500
    createCanvas(500, 500)
    //TWO PLAYERS
    //players.push(new Paddle("", "", 20, height / 2, 0))
    //THREE PLAYERS
    /*
        players.push(new Paddle(width - playerSize, height / 2 + playerSize, 45))
        players.push(new Paddle(playerSize, height / 2 + playerSize, -45))
        players.push(new Paddle(width / 2, height / 2 - playerSize * 2, 90))
    */
    //
    net = new NetworkController()
    puck = new Puck()
    //
    noLoop()
    angleMode(DEGREES)
    rectMode(CENTER)
    textAlign(CENTER)


    dialog.opendialog("main", "startdialog.html")
}

function startGame() {
    socket = io.connect('http://localhost:5000');
    net.setup()
    //
    var playerName = $('#nameInput')[0].value
    console.log($('#nameInput')[0].value)
    $('#chooseNameField').remove()
    players.push(new Paddle(socket.id, playerName))
    //
    net.sendStartSignal()
    loop()
    gameIsStarted = true
    dialog.closedialog("main")
    dialog.closedialog("notification")
}

function draw() {
    if (gameIsStarted) {
        clear()
        players[0].update()
        //
        if (net.canUpdate) {
            net.sendUpdate()
        }
        players.forEach(function(player) {
            player.show()
        })
        puck.show()
    }
}
