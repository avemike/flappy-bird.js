const { PipesControls } = require('./components/PipesControls');
const { BirdControls } = require('./components/BirdControls');
const { FrameHandler } = require('./utils/FrameHandler');
const { checkCollisions } = require('./utils/checkCollisions');

const frameControl = new FrameHandler();

module.exports.initGame = (socketio) => {
  const pipes = new PipesControls();

  frameControl.addCallback(pipes.run.bind(pipes));

  // user has connected
  socketio.on('connection', (socket) => {
    const bird = new BirdControls(socket.id);

    frameControl.addCallback(bird.gravity.bind(bird));
    frameControl.addCallback(() => checkCollisions(bird.data, pipes.data));

    socket.emit('bird', bird.data);
    socket.broadcast.emit('otherBird', bird.data);

    // every frame sends needed data to client
    socket.on('frame', () => {
      bird.updateScore(pipes.data);
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
};
