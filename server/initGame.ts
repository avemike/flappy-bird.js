import { v4 as uuidv4 } from "uuid";
import { Socket } from "socket.io";

import { logger } from "./utils/logger";
import { EVENTS } from "./events/events";
import { io as socketio } from "./index";
import { InstanceContainer } from "./InstanceContainer";

export const initGame = (): void => {
  // user has connected
  socketio.on(EVENTS.CONNECTION, (socket: Socket) => {
    logger.info(`Player "${socket.id}" has connected`);

    const instanceContainer = InstanceContainer.initialize(socket);

    const { bird, pipes, bases, game } = instanceContainer.attributes;
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
