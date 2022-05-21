import { Socket } from "socket.io";

import { EVENTS } from "~configs/events";
import { GAME_STATES as STATES } from "~configs/game";

import { GameControls } from "../game/GameControls";

export const gameOver = (id: Socket["id"]) => {
  const game = GameControls.getInstance(id);
  const { socket, bird, frameHandler } = game.attributes;

  game.state = STATES.OVER;

  // at first function call, bird.collision is not resolved yet so its value is false
  const { collision, score, highscore } = bird.attributes;

  if (!collision) socket.emit(EVENTS.GAME_OVER); // used to prevent event spam

  if (score > highscore) bird.setHighscore();

  frameHandler.clear();
  frameHandler.addCallback(() => bird.deathSlide());
  frameHandler.addCallback(() => bird.gravity());
  frameHandler.addCallback(() => bird.angleControl());
  frameHandler.addCallback(() => game.checkOver());
};
