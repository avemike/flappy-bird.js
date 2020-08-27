const express = require('express');

const app = express();
const http = require('http').createServer(app);
const socketio = require('socket.io')(http);

const PipesControls = require('./PipesControls');
const BirdControls = require('./BirdControls');

const UPDATE_MILLISECONDS = 16;

app.use(express.static('dist'));

const autoIncrementId = (() => {
  let i = 0;
  return () => {
    i += 1;
    return i;
  };
})();

const pipes = new PipesControls();

setInterval(() => {
  pipes.run();
}, UPDATE_MILLISECONDS);

socketio.on('connection', (socket) => {
  // user has connected
  const bird = new BirdControls(autoIncrementId());

  setInterval(() => {
    bird.gravity();
  }, UPDATE_MILLISECONDS);

  socket.emit('bird', bird.data);
  socket.broadcast.emit('otherBird', bird.data);

  // every frame event
  socket.on('frame', () => {
    socket.emit('pipes', pipes.data);
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
