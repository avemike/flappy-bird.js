const express = require('express');

const app = express();
const http = require('http').createServer(app);
const socketio = require('socket.io')(http);

const BirdControls = require('./BirdControls');

app.use(express.static('dist'));

socketio.on('connection', (socket) => {
  // user has connected
  const bird = new BirdControls();
  socket.emit('bird', bird.data);

  // every frame event
  socket.on('frame', () => {
    bird.gravity();
    socket.emit('bird', bird.data);
  });

  // bird's jump event
  socket.on('jump', () => {
    bird.jump();
    socket.emit('bird', bird.data);
  });
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});
