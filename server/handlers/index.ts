import { Socket } from "socket.io";

import { EVENTS } from "../../configs/events";
import { GAME_STATES as STATES } from "../../configs/game";
import { GameControls } from "../game/GameControls";
import { MultiController } from "../game/MultiController";
import { logger } from "../utils/logger";

export function onLeaveMulti(this: Socket): void {
  const { id } = this;

  MultiController.getInstance().deletePlayer(id);
}

export function onJoinMulti(this: Socket): void {
  const { id } = this;
  MultiController.getInstance().registerPlayer(id);
}

export function onStartGameMulti(this: Socket): void {
  const { id } = this;
  onStartGame.call(this);
  const { guests } = MultiController.getInstance().getPlayer(id).attributes;

  guests.forEach((guestID) => {
    const { socket } = GameControls.getInstance(guestID).attributes;
    onStartGame.call(socket);
  });
}

export function onAbortLobby(this: Socket): void {
  const { id } = this;
  MultiController.getInstance().deleteLobby(id);

  const host = MultiController.getInstance().getPlayer(id);
  const { guests } = host.attributes;

  guests.forEach((guestID) => {
    host.removeGuest(guestID);
  });
}

export function onLeaveLobby(this: Socket): void {
  const { id } = this;
  MultiController.getInstance().getPlayer(id).leaveLobby();
}

export function onReadyAction(this: Socket, ready: boolean): void {
  const { id } = this;
  const multiController = MultiController.getInstance();

  multiController.setReady(id, ready);
}

export function onJoinLobby(this: Socket, hostID: Socket["id"]): void {
  const { id } = this;

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
}

export function onFrame(this: Socket): void {
  const { id } = this;

  const game = GameControls.getInstance(id);
  const { bird, bases, socket } = game.attributes;

  const { hostID } = MultiController.getInstance().getPlayer(id)?.attributes || {};

  const { pipes } = game.attributes;

  bird.updateScore(pipes.attributes);

  socket.emit(EVENTS.PIPES, pipes.attributes);
  socket.emit(EVENTS.BASES, bases.attributes);
  socket.emit(EVENTS.BIRD, bird.attributes);

  socket.emit(EVENTS.GAME, { state: game.state });
  hostID && socket.to(hostID).emit(EVENTS.OTHER_BIRD, bird.attributes);
}

export function onDisconnect(this: Socket): void {
  const { id } = this;
  logger.info(`${id}: disconnect`);
  const { socket } = GameControls.getInstance(id).attributes;

  const { hostID } = MultiController.getInstance().getPlayer(id)?.attributes || {};

  hostID && socket.to(hostID).emit(EVENTS.OTHER_BIRD_DC, id);
}

export function onJump(this: Socket): void {
  const { id } = this;
  const { socket, bird } = GameControls.getInstance(id).attributes;
  const { hostID } = MultiController.getInstance().getPlayer(id)?.attributes || {};

  bird.jump();
  socket.emit(EVENTS.BIRD, bird.attributes);
  hostID && socket.to(hostID).emit(EVENTS.OTHER_BIRD, bird.attributes);
}

export function onStartGame(this: Socket): void {
  const { id } = this;

  const game = GameControls.getInstance(id);
  const { pipes, bird, frameHandler } = game.attributes;

  game.state = STATES.STARTED;
  frameHandler.addCallback(() => bird.gravity());
  frameHandler.addCallback(() => bird.angleControl());
  frameHandler.addCallback(() => pipes.run());
  frameHandler.addCallback(() => game.checkOver());
}

export function onRestart(this: Socket): void {
  const { id } = this;

  const game = GameControls.getInstance(id);
  const { pipes, bird, frameHandler, bases } = game.attributes;

  game.state = STATES.RUNNING;
  bird.resetState();
  pipes.resetState();
  frameHandler.clear();
  frameHandler.addCallback(() => bases.run());
}
