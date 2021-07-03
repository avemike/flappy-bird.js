import { v4 as uuidv4 } from "uuid";
import { Server } from "socket.io";

import { PipesController } from "./components/PipesController";
import { BirdController } from "./components/BirdController";
import { FrameHandler } from "./utils/FrameHandler";
import { GameControls } from "./components/GameControls";
import { BasesController } from "./components/BasesController";
import { logger } from "./utils/logger";

const frameControl = new FrameHandler();

export const initGame = (socketio: Server): void => {
  // user has connected
  socketio.on("connection", (socket) => {
    logger.info(`Player "${socket.id}" has connected`);
    const bird = new BirdController(socket.id);
    const pipes = new PipesController();
    const bases = new BasesController();
    const game = new GameControls(bird, pipes, bases, socket, frameControl);

    frameControl.addCallback(bases.run.bind(bases));
    /*
    socket.on("multiplayer", () => {
      const roomID = uuidv4(); TODO
      socket.join(roomID);
    });
    */
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
