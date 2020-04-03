'use strict';
const express = require('express');
const PORT = process.env.PORT || 5000;
var app = express()
var server = app.listen(PORT);
const io = require('socket.io')(server);
app.use(express.static('public'));
clog('Server is running on port ' + PORT + ' !');

function clog(msg) {
    console.log(msg);
}
var atzen = [];
var players = [];
//
io.sockets.on('connection', (socket) => {
    //
    atzen.push(socket)
    console.log('Atze ist da mit der Nummer ' + socket.id)
    clog("Players now online: " + atzen.length);
    //
    socket.on('start', function(data) {
        var newPlayer = new Player(socket.id);
        players.push(newPlayer)
        clog("starting: " + newPlayer.id);
        //
        //Inform other players of joined player
        data.id = socket.id
        socket.broadcast.emit("new player", data)
    })
    //
    socket.on('update', function(data) {
        for (var i = players.length - 1; i >= 0; i--) {
            if (socket.id == players[i].id) {
                clog(players[i].id + " " + players[i].x);
                players[i].updateValues(data.x)
                //
                socket.broadcast.emit("playerUpdate", data)
                break
            }
        }
    })
    //
    //
    socket.on('wieviele', function() {
        socket.emit("soviele", atzen.length);
    })
    //
    socket.on('leave', function() {
        var index = player.indexOf(socket);
        atzen.splice(index)
    })
    //
    socket.on('disconnect', function() {
        clog('Ein Atze weniger mit der Nummer ' + socket.id);
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
//
var puckX = 0

function game(argument) {
    puckX += 1
    var data = {
        x: puckX,
        y: 100
    }
    io.sockets.emit("puckUpdate", data)
}
setInterval(function() {
    game()
}, 100)