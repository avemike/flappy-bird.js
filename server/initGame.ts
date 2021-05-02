import { Server } from "socket.io";

import { PipesControls } from "./components/PipesControls";
import { BirdControls } from "./components/BirdControls";
import { FrameHandler } from "./utils/FrameHandler";
import { GameControls } from "./components/GameControls";
import { BasesControls } from "./components/BasesControls";

const frameControl = new FrameHandler();

export const initGame = (socketio: Server) => {
  // user has connected
  socketio.on("connection", (socket) => {
    console.log(socket.id, "connected");
    const bird = new BirdControls(socket.id);
    const pipes = new PipesControls();
    const bases = new BasesControls();
    const game = new GameControls(bird, pipes, bases, socket, frameControl);

    frameControl.addCallback(bases.run.bind(bases));
    // frameControl.addCallback(bird.gravity.bind(bird));

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
