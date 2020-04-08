let net, socket, dialog
var gameIsStarted = false
let updateSpeed = 200 //in milliseconds
//
let canvSize, playerSize
var players = []

function clog(msg) {
    console.log(msg);
}

function setup() {
    background(0)
    playerSize = 800 / 10
    createCanvas(800, 800)
    let canvas = createCanvas(800, 800)
    canvas.parent('playground')
    //
    net = new NetworkController()
    puck = new Puck()
    dialog = new UserDialog()
    //
    noLoop()
    angleMode(DEGREES)
    rectMode(CENTER)
    textAlign(CENTER)
    dialog.opendialog("main", "startdialog.html")
    socket = io.connect('http://localhost:5000');
}

function startGame() {
    net.setup()
    //
    let playerName = $('#nameInput')[0].value
    console.log($('#nameInput')[0].value)
    //
    var mainPlayer = new Paddle(socket.id, playerName)
    players.push(mainPlayer)
    respawnPlayer()
    //
    net.sendStartSignal()
    loop()
    gameIsStarted = true
    dialog.closedialog("main")
    dialog.closedialog("notification")
}

function draw() {
    if (gameIsStarted && players.length >= 2) {
        background(0)
        players[0].update()
        //
        if (net.canUpdate) {
            net.sendUpdate()
        }
        players.forEach(function(player) {
            player.show()
        })
        puck.show()
        if (!socket.id) { //if disconnected
            gameIsStarted = false
        }
    }
}

function respawnPlayer() {
    var movementLines2P = [{
        p1: {
            x: 40,
            y: 0
        },
        p2: {
            x: 40,
            y: 800
        }
    }, {
        p1: {
            x: 760,
            y: 0
        },
        p2: {
            x: 760,
            y: 800
        }
    }]
    var allPlayerIds = []
    players.forEach(function(player) {
        allPlayerIds.push(player.id)
    })
    allPlayerIds.sort() //sorts alphabetically
    //
    if (players.length == 2) {
        let ownPlayerNumber = allPlayerIds.indexOf(socket.id)
        //
        if (ownPlayerNumber == 0) {
            players[0].mov = movementLines2P[0]
            players[0].spawn()
            //
        } else if (ownPlayerNumber == 1) {
            players[0].mov = movementLines2P[1]
            players[0].spawn()
            //
        }
    } else if (players.length == 3) {
        //
    }
}