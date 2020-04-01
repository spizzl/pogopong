
'use strict';
const express = require('express');
const socketIO = require('socket.io');

const PORT = process.env.PORT || 5000;
const INDEX = '/public/test.html';

const server = express()
  .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
  .listen(PORT, () => console.log(`lausche auf ${PORT}`));

const zocket = socketIO(server);

zocket.on('connection', (socket) => {
  console.log('Atze ist da');
  socket.on('disconnect', () => console.log('Pole'));
});

setInterval(() => zocket.emit('tacho', new Date().toTimeString()), 1000);
