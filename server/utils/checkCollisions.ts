import { BIRD_PROPS, PIPE_PROPS, BASE_PROPS } from "../../configs/game";
import { BirdAttributes, PipeAttributes } from "../types";

// 433 IS +/- CANVAS HEIGHT
const tmp_canvas_height = 433;

export const checkCollisions = (
  birdAttribs: BirdAttributes,
  pipesAttribs: PipeAttributes[]
): boolean => {
  // check if birdAttribs is too far away for collision
  if (
    (birdAttribs.x + BIRD_PROPS.WIDTH < pipesAttribs[0].offsetX ||
      birdAttribs.x > pipesAttribs[0].offsetX + PIPE_PROPS.WIDTH) &&
    birdAttribs.y < tmp_canvas_height - BASE_PROPS.HEIGHT
  )
    return false;

  const topBird = birdAttribs.y;
  const bottomBird = birdAttribs.y + BIRD_PROPS.HEIGHT;
  const topGap = pipesAttribs[0].offsetY + PIPE_PROPS.ONE_PIPE_HEIGHT;
  const bottomGap = topGap + PIPE_PROPS.GAP;

  // check if bird is colliding with pipe
  if (!(topBird > topGap && bottomBird < bottomGap)) {
    // -----------------------------------------------
    // TODO IMPLEMENT COLLISION WITH PIPES!!!!!!!!!!!!!
    // -----------------------------------------------
    //   birdAttribs.collision = true;
    //   console.log("kolizja z rurka");
    //   return true;
    // gameData.state = "over";
  }

  if (bottomBird >= tmp_canvas_height - BASE_PROPS.HEIGHT) {
    birdAttribs.y =
      tmp_canvas_height - BASE_PROPS.HEIGHT - BIRD_PROPS.HEIGHT + 10;
    birdAttribs.collision = true;

    return true;
  }

  return false;
};
