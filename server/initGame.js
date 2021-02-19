const { PipesControls } = require("./components/PipesControls");
const { BirdControls } = require("./components/BirdControls");
const { GameControls } = require("./components/GameControls");
const { BasesControls } = require("./components/BasesControls");
const { FrameHandler } = require("./utils/FrameHandler");
// const BasesControls = require('./components/BasesControls');

const frameControl = new FrameHandler();

module.exports.initGame = (socketio) => {
  // user has connected
  socketio.on("connection", (socket) => {
    const bird = new BirdControls(socket.id);
    const pipes = new PipesControls();
    const bases = new BasesControls();
    const game = new GameControls(bird, pipes, bases, socket, frameControl);

    frameControl.addCallback(bases.run.bind(bases));

    socket.emit("bird", bird.data);
    socket.broadcast.emit("otherBird", bird.data);

    // every frame sends needed data to client
    socket.on("frame", () => {
      bird.updateScore(pipes.data);
      socket.emit("pipes", pipes.data);
      socket.emit("bases", bases.data);
      socket.emit("bird", bird.data);
      socket.emit("game", game.data);
      socket.broadcast.emit("otherBird", bird.data);
    });

    // player disconnection event
    socket.on("disconnect", () => {
      socket.broadcast.emit("otherBirdDc", bird.data.id);
    });

    // bird's jump event
    socket.on("jump", () => {
      bird.jump();
      socket.emit("bird", bird.data);
      socket.broadcast.emit("otherBird", bird.data);
    });
  });
};
