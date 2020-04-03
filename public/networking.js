class NetworkController {
    setup() {
        this.canUpdate = true
        //
        socket.on("new player", function(data) {
            clog("adding new player: ")
            clog(data)
            var newPlayer = new Paddle(data.id, data.name)
            players.push(newPlayer);
        });
        //
        socket.on("update", function(data) {
            for (var i = players.length - 1; i >= 0; i--) {
                if (players[i].id == data.id) {
                    clog("received: ")
                    clog(data)
                    players[i].x = width * data.x;
                }
            }
        });
        //
        socket.on("player disconnected", function(data) {
            for (var i = players.length - 1; i >= 0; i--) {
                if (players[i].id == data.id) {
                    players.splice(i + 1, 1);
                    break;
                }
            }
        });
    }
    sendStartSignal() {
        var data = {
            name: players[0].name
        }
        socket.emit("start", data)
    }
    receivePlayers() {}
    receivePuck() {}
    //
    sendUpdate() {
        this.canUpdate = false;
        setTimeout(function() {
            net.canUpdate = true
        }, updateSpeed)
        var data = {
            x: players[0].x,
            id: socket.id
        }
        //
        clog("sending: ")
        clog(data)
        socket.emit("update", data);
    }
}