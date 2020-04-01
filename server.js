
'use strict';
const express = require('express');
const socketIO = require('socket.io');

const PORT = process.env.PORT || 5000;
const INDEX = '/public/test.html';

const server = express()
  .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
  .listen(PORT, () => console.log(`lausche auf ${PORT}`));

const zocket = socketIO(server);
var online = 0


zocket.on('connection', (socket) => {
  console.log('Atze ist da');
  online += 1
  socket.on('disconnect', () => online -= 1);
});

setInterval(() => zocket.emit('status', online), 1000);
