import { Socket } from "socket.io";
import { GameControls, STATES } from "../game/GameControls";
import { EVENTS } from "../handlers";
import { checkCollisions } from "../utils/checkCollisions";

export const gameOver = (id: Socket["id"]): void => {
  const game = GameControls.getInstance(id);
  const { socket, bird, frameHandler, pipes } = game.attributes;

  game.state = STATES.over;

  socket.emit(EVENTS.GAME_OVER);

  const { score, highscore } = bird.attributes;
  if (score > highscore) bird.setHighscore();

  frameHandler.reset();
  frameHandler.addCallback(() => bird.gravity());
  frameHandler.addCallback(() => bird.angleControl());
  frameHandler.addCallback(() =>
    checkCollisions(bird.attributes, pipes.attributes)
  );
};
