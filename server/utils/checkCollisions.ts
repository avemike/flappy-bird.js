import { BirdData } from "server/components/BirdControls";
import { Pipe } from "server/components/Pipe";
import { PipeDataType, PipesControls } from "server/components/PipesControls";
import { BIRD_PROPS, PIPE_PROPS } from "../../configs/game";

export const checkCollisions = (bird: BirdData, pipes: PipeDataType) => {
  // check if bird is too far away for collision
  if (
    bird.x + BIRD_PROPS.WIDTH < pipes[0].offsetX ||
    bird.x > pipes[0].offsetX + PIPE_PROPS.WIDTH
  ) {
    return;
  }

  const topBird = bird.y;
  const bottomBird = bird.y + BIRD_PROPS.HEIGHT;
  const topGap = pipes[0].offsetY + PIPE_PROPS.ONE_PIPE_HEIGHT;
  const bottomGap = topGap + PIPE_PROPS.GAP;

  // check if bird is colliding
  if (!(topBird > topGap && bottomBird < bottomGap)) {
    // end game for this player
  }
};
