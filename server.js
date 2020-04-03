'use strict';
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
var puckHandler = new PuckHandler()
var updateHeartbeat = 200
//
io.sockets.on('connection', (socket) => {
    //
    atzen.push(socket)
    console.log('Atze ist da mit der Nummer ' + socket.id)
    clog("Players now online: " + atzen.length)
    //
    socket.on('start', function(data) {
        var newPlayer = new Player(socket.id)
        players.push(newPlayer)
        clog("starting: " + newPlayer.id)
        //
        //Inform other players of joined player
        socket.broadcast.emit("new player", data)
        //
        if (players.length == 1) {
            startGame()
        }
    })
    //
    socket.on('update', function(data) {
        for (var i = players.length - 1; i >= 0; i--) {
            if (socket.id == players[i].id) {
                clog(players[i].id + " " + players[i].x)
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
        players.splice(index)
        clog('Ein Atze weniger mit der Nummer ' + socket.id);
        //
        if (players.length == 0) {
            endGame()
        }
    })
})
class Player {
    constructor(id, x) {
        this.id = id;
        this.x = x;
    }
    //
    updateValues(x) {
        this.x = x;
    }
    //
    getValues() {
        var data = {
            id: this.id,
            x: this.x
        }
        return data;
    }
}
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