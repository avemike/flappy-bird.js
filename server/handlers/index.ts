// import { v4 as uuidv4 } from "uuid";

import { Socket } from "socket.io";
import { GameControls, STATES } from "../components/GameControls";
import { logger } from "../utils/logger";
import { EVENTS } from "./events";

export { EVENTS };

type Callback = () => void;

export const onFrame = (id: Socket["id"]): Callback => () => {
  const game = GameControls.getInstance(id);
  const { pipes, bird, bases, socket } = game.attributes;

  bird.updateScore(pipes.attributes);
  socket.emit(EVENTS.PIPES, pipes.attributes);
  socket.emit(EVENTS.BASES, bases.attributes);
  socket.emit(EVENTS.BIRD, bird.attributes);
  socket.emit(EVENTS.GAME, game.state);
  socket.broadcast.emit(EVENTS.OTHER_BIRD, bird.attributes);
};

export const onDisconnect = (id: Socket["id"]): Callback => () => {
  logger.debug(`${id}: disconnect`);
  const { socket } = GameControls.getInstance(id).attributes;

  socket.broadcast.emit(EVENTS.OTHER_BIRD_DC, id);
};

export const onJump = (id: Socket["id"]): Callback => () => {
  const { socket, bird } = GameControls.getInstance(id).attributes;

  bird.jump();
  socket.emit(EVENTS.BIRD, bird.attributes);
  socket.broadcast.emit(EVENTS.OTHER_BIRD, bird.attributes);
};

export const onStartGame = (id: Socket["id"]): Callback => () => {
  const game = GameControls.getInstance(id);
  const { pipes, bird, frameHandler } = game.attributes;

  // socket.broadcast.emit("start game"); // TODO
  game.state = STATES.started;
  frameHandler.addCallback(bird.gravity.bind(bird));
  frameHandler.addCallback(bird.angleControl.bind(bird));
  frameHandler.addCallback(pipes.run.bind(pipes));
  frameHandler.addCallback(game.checkOver.bind(this));
};

export const onRestart = (id: Socket["id"]): Callback => () => {
  const game = GameControls.getInstance(id);
  const { pipes, bird, frameHandler, bases } = game.attributes;

  game.state = STATES.running;
  bird.resetState();
  pipes.resetState();
  frameHandler.reset();
  frameHandler.addCallback(bases.run.bind(bases));
};
/*
    socket.on("multiplayer", () => {
      const roomID = uuidv4(); TODO
      socket.join(roomID);
    });
    */
