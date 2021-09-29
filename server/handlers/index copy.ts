import { Socket } from "socket.io";

import { EVENTS } from "../../configs/events";
import { GAME_STATES as STATES } from "../../configs/game";
import { GameControls } from "../game/GameControls";
import { MultiController } from "../game/MultiController";
import { logger } from "../utils/logger";

type Callback = () => void;
type MutliCallback = (hostID: Socket["id"]) => void;
type ReadyCallback = (ready: boolean) => void;

export function onTest(this: Socket): void {
  const id = this.id;
  logger.info(id);
}

export const onLeaveMulti = (id: Socket["id"]): Callback => () => {
  MultiController.getInstance().deletePlayer(id);
};

export const onJoinMulti = (id: Socket["id"]): Callback => () => {
  MultiController.getInstance().registerPlayer(id);
};

export const onStartGameMulti = (id: Socket["id"]): Callback => () => {
  onStartGame(id)();
  const { guests } = MultiController.getInstance().getPlayer(id).attributes;

  guests.forEach((guestID) => {
    onStartGame(guestID)();
    // const { socket } = GameControls.getInstance(guestID).attributes;
    // socket.emit(EVENTS.MULTI_START_GAME);
  });
};

export const onAbortLobby = (id: Socket["id"]): Callback => () => {
  MultiController.getInstance().deleteLobby(id);

  const host = MultiController.getInstance().getPlayer(id);
  const { guests } = host.attributes;

  guests.forEach((guestID) => {
    host.removeGuest(guestID);
  });
};

export const onLeaveLobby = (id: Socket["id"]): Callback => () => {
  MultiController.getInstance().getPlayer(id).leaveLobby();
};

export const onReadyAction = (id: Socket["id"]): ReadyCallback => (ready: boolean) => {
  const multiController = MultiController.getInstance();

  multiController.setReady(id, ready);
};

export const onJoinLobby = (id: Socket["id"]): MutliCallback => (hostID: Socket["id"]) => {
  const multiController = MultiController.getInstance();

  multiController.getPlayer(id).joinLobby(hostID);
  multiController.getPlayer(hostID).addGuest(id);

  const { pipes: hostPipes } = GameControls.getInstance(hostID).attributes;

  multiController.getPlayer(hostID).attributes.guests.forEach((guestID) => {
    const { pipes } = GameControls.getInstance(guestID).attributes;
    pipes.syncWith(hostPipes);
  });

  const { socket, bird } = GameControls.getInstance(id).attributes;
  const { socket: hostSocket } = GameControls.getInstance(hostID).attributes;

  socket.to(hostSocket.id).emit(EVENTS.BIRD_JOINED, socket.id);
  socket.to(hostSocket.id).emit(EVENTS.OTHER_BIRD, bird.attributes);
};

export const onFrame = (id: Socket["id"]): Callback => () => {
  const game = GameControls.getInstance(id);
  const { bird, bases, socket } = game.attributes;

  // const player = MultiController.getInstance().getPlayer(id);
  const { hostID } = MultiController.getInstance().getPlayer(id)?.attributes || {};
  // const hostGame = GameControls.getInstance(hostID) || {};

  // const { pipes } = hostID ? hostGame.attributes : game.attributes;
  const { pipes } = game.attributes;

  bird.updateScore(pipes.attributes);

  socket.emit(EVENTS.PIPES, pipes.attributes);
  socket.emit(EVENTS.BASES, bases.attributes);
  socket.emit(EVENTS.BIRD, bird.attributes);
  // socket.emit(EVENTS.GAME, { state: hostID ? hostGame.state : game.state });
  socket.emit(EVENTS.GAME, { state: game.state });
  hostID && socket.to(hostID).emit(EVENTS.OTHER_BIRD, bird.attributes);
};

export const onDisconnect = (id: Socket["id"]): Callback => () => {
  logger.info(`${id}: disconnect`);
  const { socket } = GameControls.getInstance(id).attributes;

  const { hostID } = MultiController.getInstance().getPlayer(id)?.attributes || {};

  hostID && socket.to(hostID).emit(EVENTS.OTHER_BIRD_DC, id);
};

export const onJump = (id: Socket["id"]): Callback => () => {
  const { socket, bird } = GameControls.getInstance(id).attributes;
  const { hostID } = MultiController.getInstance().getPlayer(id)?.attributes || {};

  bird.jump();
  socket.emit(EVENTS.BIRD, bird.attributes);
  hostID && socket.to(hostID).emit(EVENTS.OTHER_BIRD, bird.attributes);
};

export const onStartGame = (id: Socket["id"]): Callback => () => {
  // const game = GameControls.getInstance(id);
  // const { pipes, bird, frameHandler } = game.attributes;

  // game.state = STATES.STARTED;
  // frameHandler.addCallback(() => bird.gravity());
  // frameHandler.addCallback(() => bird.angleControl());
  // frameHandler.addCallback(() => pipes.run());
  // frameHandler.addCallback(() => game.checkOver());

  const game = GameControls.getInstance(id);
  const { pipes, bird, frameHandler } = game.attributes;

  const { hostID } = MultiController.getInstance().getPlayer(id)?.attributes || {};

  game.state = STATES.STARTED;
  frameHandler.addCallback(() => bird.gravity());
  frameHandler.addCallback(() => bird.angleControl());
  // !hostID && frameHandler.addCallback(() => pipes.run());
  frameHandler.addCallback(() => pipes.run());
  frameHandler.addCallback(() => game.checkOver());
};

export const onRestart = (id: Socket["id"]): Callback => () => {
  const game = GameControls.getInstance(id);
  const { pipes, bird, frameHandler, bases } = game.attributes;

  game.state = STATES.RUNNING;
  bird.resetState();
  pipes.resetState();
  frameHandler.clear();
  frameHandler.addCallback(() => bases.run());
};
