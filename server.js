//
const express = require('express')
const PORT = process.env.PORT || 5000
var app = express()
var server = app.listen(PORT)
const io = require('socket.io')(server)
app.use(express.static('public'))
clog('Server is running on port ' + PORT + ' !')

function clog(msg) {
    console.log(msg);
}
var atzen = []
var players = []
//
var PuckHandler = require('./js/puckHandler.js')
var puckHandler = new PuckHandler()
//
var Player = require('./js/Player.js')
//
var updateHeartbeat = 200
//
io.sockets.on('connection', (socket) => {
    //
    atzen.push(socket)
    console.log('Atze ist da mit der Nummer ' + socket.id)
    clog("Atzen now online: " + atzen.length)
    //
    socket.on('start', function(data) {
        var newPlayer = new Player(socket.id, data.name)
        players.push(newPlayer)
        console.log('Player ist da mit der Nummer ' + socket.id + ' und Name ' + data.name)
        clog("Players now online: " + players.length)
        //
        //Inform other players of joined player
        socket.broadcast.emit("new player", data)
        //
        if (players.length == 1) {
            startGame()
        }
    })
    //
    socket.on("data for new player", function(data, newPlayerId) {
        clog("received data for new player")
        //
        for (var i = atzen.length - 1; i >= 0; i--) {
            if (newPlayerId == atzen[i].id) {
                atzen[i].emit("add existing players", data)
                break;
            }
        }
    });
    //
    socket.on('update', function(data) {
        for (var i = players.length - 1; i >= 0; i--) {
            if (socket.id == players[i].id) {
                clog('update from ' + players[i].name + " " + players[i].x)
                players[i].updateValues(data.x)
                //
                socket.broadcast.emit("playerUpdate", data)
                break
            }
        }
    })
    //
    socket.on('wieviele', function() {
        socket.emit("soviele", atzen.length);
    })
    //
    socket.on('disconnect', function() {
        var index = atzen.indexOf(socket);
        atzen.splice(index)
        var playerName;
        for (var i = players.length - 1; i >= 0; i--) {
            if (socket.id == players[i].id) {
                players.splice(i, 1)
                playerName = players.name
            }
        }
        clog('Ein Atze und Player weniger mit der Nummer ' + socket.id + ' und Name ' + playerName)
        clog("Atzen now online: " + atzen.length)
        clog("Players now online: " + players.length)
        //
        if (players.length == 0) {
            endGame()
        }
    })
})
//
function startGame() {
    puckHandler.spawnPuck()
    puckHandler.startPuck()
    //
    setInterval(function() {
        game()
    }, updateHeartbeat)
}

function endGame() {
    clearInterval()
}
//
function game() {
    players.forEach(function(player) {
        puckHandler.checkPuckCollision(player)
    })
    puckHandler.updatePuck()
    var data = puckHandler.getPuck()
    io.sockets.emit("puckUpdate", data)
}