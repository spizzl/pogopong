'use strict';
const express = require('express');
const PORT = process.env.PORT || 5000;
var app = express()
var server = app.listen(PORT);
const io = require('socket.io')(server);


app.use(express.static('public'));

function clog(msg) {
    console.log(msg);
}
/*
const server = express()
  .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
  .listen(PORT, () => console.log(`lausche auf ${PORT}`));
*/

var atzen = [];
var player = [];

io.sockets.on('connection', (socket) => {
  atzen.push([socket, 0])
  console.log('Atze ist da')

  socket.on('disconnect', function() {
    clog('Ein Atze weniger mit der Nummer ' + socket.id);
  })

  socket.on('start', function() {
    var index = atzen.indexOf(socket);
    player.push(socket)
  })

  socket.on('leave', function() {
    var index = player.indexOf(socket);
    atzen.slice(index)
  })

  socket.on('wieviele', function() {
    socket.emit("soviele", atzen.length);
  })

})
