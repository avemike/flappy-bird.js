import { v4 as uuidv4 } from "uuid";
import { Server, Socket } from "socket.io";

import { PipesController } from "./controllers/PipesController";
import { Bird } from "./components/Bird";
import { FrameHandler } from "./utils/FrameHandler";
import { GameControls } from "./components/GameControls";
import { BasesController } from "./controllers/BasesController";
import { logger } from "./utils/logger";
import { EVENTS } from "./utils/events";

const frameControl = new FrameHandler();

export const initGame = (socketio: Server): void => {
  // user has connected
  socketio.on(EVENTS.CONNECTION, (socket: Socket) => {
    logger.info(`Player "${socket.id}" has connected`);

    const bird = new Bird(socket.id);
    const pipes = new PipesController();
    const bases = new BasesController();
    const game = new GameControls({ bird, pipes, bases, socket, frameControl });

    frameControl.addCallback(bases.run.bind(bases));
    /*
    socket.on("multiplayer", () => {
      const roomID = uuidv4(); TODO
      socket.join(roomID);
    });
    */
    socket.emit(EVENTS.BIRD, bird.attributes);
    socket.broadcast.emit(EVENTS.OTHER_BIRD, bird.attributes);

    // every frame sends needed data to client
    socket.on(EVENTS.FRAME, () => {
      bird.updateScore(pipes.attributes);
      socket.emit(EVENTS.PIPES, pipes.attributes);
      socket.emit(EVENTS.BASES, bases.attributes);
      socket.emit(EVENTS.BIRD, bird.attributes);
      socket.emit(EVENTS.GAME, game.attributes);
      socket.broadcast.emit(EVENTS.OTHER_BIRD, bird.attributes);
    });

    // player disconnection event
    socket.on(EVENTS.DISCONNECT, () => {
      socket.broadcast.emit(EVENTS.OTHER_BIRD_DC, bird.attributes.id);
    });

    // bird's jump event
    socket.on(EVENTS.JUMP, () => {
      bird.jump();
      socket.emit(EVENTS.BIRD, bird.attributes);
      socket.broadcast.emit(EVENTS.OTHER_BIRD, bird.attributes);
    });
  });
};
