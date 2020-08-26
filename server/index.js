const express = require('express');

const app = express();
const http = require('http').createServer(app);
const socketio = require('socket.io')(http);

const BirdControls = require('./BirdControls');

app.use(express.static('dist'));

const autoIncrementId = (() => {
  let i = 0;
  return () => {
    i += 1;
    return i;
  };
})();

socketio.on('connection', (socket) => {
  // user has connected
  const bird = new BirdControls(autoIncrementId());

  socket.emit('bird', bird.data);
  socket.broadcast.emit('otherBird', bird.data);

  // every frame event
  socket.on('frame', () => {
    bird.gravity();
    socket.emit('bird', bird.data);
    socket.broadcast.emit('otherBird', bird.data);
  });

  // player disconnection event
  socket.on('disconnect', () => {
    socket.broadcast.emit('otherBirdDc', bird.data.id);
  });

  // bird's jump event
  socket.on('jump', () => {
    bird.jump();
    socket.emit('bird', bird.data);
    socket.broadcast.emit('otherBird', bird.data);
  });
});

http.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('listening on *:3000');
});
