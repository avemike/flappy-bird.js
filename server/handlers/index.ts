// import { v4 as uuidv4 } from "uuid";

import { Socket } from "socket.io";
import { InstanceContainer } from "../InstanceContainer";
import { logger } from "../utils/logger";
import { EVENTS } from "./events";

export { EVENTS };

type Callback = () => void;

export const onFrame = (id: Socket["id"]): Callback => () => {
  const { pipes, bird, bases, socket, game } = InstanceContainer.getInstance(
    id
  ).attributes;

  bird.updateScore(pipes.attributes);
  socket.emit(EVENTS.PIPES, pipes.attributes);
  socket.emit(EVENTS.BASES, bases.attributes);
  socket.emit(EVENTS.BIRD, bird.attributes);
  socket.emit(EVENTS.GAME, game.attributes);
  socket.broadcast.emit(EVENTS.OTHER_BIRD, bird.attributes);
};

export const onDisconnect = (id: Socket["id"]): Callback => () => {
  logger.debug(`${id}: disconnect`);
  const { socket } = InstanceContainer.getInstance(id).attributes;

  socket.broadcast.emit(EVENTS.OTHER_BIRD_DC, id);
};

export const onJump = (id: Socket["id"]): Callback => () => {
  const { socket, bird } = InstanceContainer.getInstance(id).attributes;

  bird.jump();
  socket.emit(EVENTS.BIRD, bird.attributes);
  socket.broadcast.emit(EVENTS.OTHER_BIRD, bird.attributes);
};

/*
    socket.on("multiplayer", () => {
      const roomID = uuidv4(); TODO
      socket.join(roomID);
    });
    */
