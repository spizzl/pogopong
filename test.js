var express = require('express');
var port = 3003;
var app = express();
var server = app.listen(port);
app.use(express.static('public'));
clog('Server is running on port ' + port + ' !');
//
//
//FOR MULTIPLAYER POLYGON INVADERS--------------------------------
function clog(msg) {
    console.log(msg);
}
//
/*
var io = require('socket.io')(server);
//
var clients = [];
var players = [];
//var alreadyHas2Players = false;
//

io.sockets.on('connect', function(socket) {
    //
    clients.push(socket);
    
    clog('We have a new online player: ' + socket.id);
    clog("Players now online: " + clients.length);
    //
    socket.on('start', function(data) {
        var newPlayer = new Player(socket.id, data.x, data.bullets);
        players.push(newPlayer);
        clog("starting: " + newPlayer.playerId + ' ' + newPlayer.x);
        //
        data.id = socket.id;
        socket.broadcast.emit("new player", data)
    });
    //
    socket.on("new player added", function(data, newPlayerId) {
        clog("new player added")
        //
        data.id = socket.id;
        for (var i = clients.length - 1; i >= 0; i--) {
            if (newPlayerId == clients[i].id) {
                clients[i].emit("add existing players", data)
                break;
            }
        }
    });
    //
    socket.on('update', function(data) {
        for (var i = players.length - 1; i >= 0; i--) {
            if (socket.id == players[i].playerId) {
                clog(players[i].playerId + " " + players[i].x);
                players[i].x = data.x;
                players[i].bullets = data.bullets || [];
                //
                data.id = socket.id;
                socket.broadcast.emit("update", data)
                break;
            }
        }
        //clog(players[socket.id].playerId + " " + players[socket.id].x);
        /*players[socket.id].x = data.x;
        players[socket.id].bullets = data.bullets || [];
        clog("updating: " + players[socket.id].playerId + ' ' + players[socket.id].x);
        //
        var otherPlayers = players.splice(socket.id);
        for (var i = otherPlayers.length - 1; i >= 0; i--) {
            otherPlayers[i].emit("update", data);
        }
    });
    /*
    if (clients.length > 1) {
        clients[clients.length - 1].emit("FS-newPlayerJoined", lastJoin);
        //
        socket.on("TS-dataForNewPlayer", function(data) {
            clients[lastJoin].emit("FS-dataForNewPlayer", data);
        });
        //
        socket.on("TS-update", function(data) {
            socket.broadcast.emit("FS-update", data)
        });
    }
    socket.on('disconnect', function() {
        clog('An online player disconnected: ' + socket.id);
        var index = clients.indexOf(socket);
        clients.splice(index, 1);
        players.splice(index, 1);
        clog("Players now online: " + clients.length);
        //
        socket.broadcast.emit("player disconnected", socket.id)
    });
});

function Player(id, x, bullets) {
    this.playerId = id;
    this.x = x;
    this.bullets = bullets || [];
    //
    this.updateValues = function(x, bullets) {
        this.x = x;
        this.bullets = bullets || [];
    }
    //
    this.getValues = function() {
        var data = {
            id: this.playerId,
            x: this.x,
            bullets: this.bullets
        }
        return data;
    }
}
*/