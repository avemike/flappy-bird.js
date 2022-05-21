import * as core from "express-serve-static-core";
import { Socket } from "socket.io";

import { CanvasSizeAttributes } from "~configs/canvas";
import { EVENTS } from "~configs/events";
import { BIRD_COLORS, GAME_STATES as STATES } from "~configs/game";

import { getEnumKeyByEnumValue } from "~client/utils/getEnumKeyByEnumValue";

import { GameControls } from "../game/GameControls";
import { MultiController } from "../game/MultiController";
import { setCanvasSize } from "../utils/canvasSize";
import { logger } from "../utils/logger";
import { onJoinLobby, onJoinMulti } from "./mutli";

export function onDomLoaded(this: Socket, canvasSize: CanvasSizeAttributes) {
  setCanvasSize(canvasSize);

  const game = GameControls.initialize(this);
  const { bird } = game.attributes;

  this.emit(EVENTS.BIRD, bird.attributes);
}

export function getDestination(app: core.Express) {
  const { destination } = app.get("want_to_join");

  return function redirectToLobby(this: Socket) {
    if (destination) {
      this.emit(EVENTS.LOBBY_SET);
      onJoinMulti.call(this);
      onJoinLobby.call(this, destination);
    } else {
      logger.error(`wrong destination = ${destination}`);
    }
  };
}

export function onBirdColorChange(this: Socket, color: BIRD_COLORS) {
  const { bird } = GameControls.getInstance(this.id).attributes;

  const key = getEnumKeyByEnumValue(BIRD_COLORS, color.toLowerCase());

  if (key) {
    bird.setColor(BIRD_COLORS[key]);
    this.emit(EVENTS.BIRD_COLOR_UPDATE, BIRD_COLORS[key]);
  }
}

export function onFrame(this: Socket) {
  const { id } = this;
  const game = GameControls.getInstance(id);

  if (!game) return;

  const { bird, bases, frameHandler, pipes } = game.attributes;
  const { hostID } = MultiController.getInstance().getPlayer(id)?.attributes || {};

  frameHandler.runCallbacks();

  bird.updateScore(pipes.attributes);

  this.emit(EVENTS.PIPES, pipes.attributes);
  this.emit(EVENTS.BASES, bases.attributes);
  this.emit(EVENTS.BIRD, bird.attributes);

  this.emit(EVENTS.GAME, { state: game.state });

  if (hostID) {
    this.to(hostID).emit(EVENTS.OTHER_BIRD, bird.attributes);
  }
}

export function onDisconnect(this: Socket) {
  const { id } = this;
  const { socket, frameHandler } = GameControls.getInstance(id)?.attributes || {}; // TRASH remove OR operator for production;

  logger.info(`${id}: disconnect`);

  // const { socket, frameHandler } = GameControls.getInstance(id).attributes;

  frameHandler?.clear(); // TRASH this too
  GameControls.removeInstance(id);

  const { hostID } = MultiController.getInstance().getPlayer(id)?.attributes || {};

  if (hostID) {
    socket.to(hostID).emit(EVENTS.OTHER_BIRD_DC, id);
  }
}

export function onJump(this: Socket) {
  const { id } = this;
  const { bird } = GameControls.getInstance(id).attributes;
  const { hostID } = MultiController.getInstance().getPlayer(id)?.attributes || {};

  bird.jump();
  this.emit(EVENTS.BIRD, bird.attributes);

  if (hostID) {
    this.to(hostID).emit(EVENTS.OTHER_BIRD, bird.attributes);
  }
}

export function onStartGame(this: Socket) {
  const { id } = this;

  const game = GameControls.getInstance(id);
  const { pipes, bird, frameHandler } = game.attributes;

  game.state = STATES.STARTED;
  frameHandler.addCallback(() => bird.gravity());
  frameHandler.addCallback(() => bird.angleControl());
  frameHandler.addCallback(() => pipes.run());
  frameHandler.addCallback(() => game.checkOver());
}

export function onRestart(this: Socket) {
  const { id } = this;

  const game = GameControls.getInstance(id);
  const { pipes, bird, frameHandler, bases } = game.attributes;

  game.state = STATES.RUNNING;
  bird.resetState();
  pipes.resetState();
  frameHandler.clear();
  frameHandler.addCallback(() => bases.run());
}
