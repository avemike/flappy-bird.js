import { BIRD_PROPS, PIPE_PROPS, BASE_PROPS } from "../../configs/game";
import { BirdDataType, PipeDataType } from "../types";

// 433 IS +/- CANVAS HEIGHT
const tmp_canvas_height = 433;

export const checkCollisions = (
  birdData: BirdDataType,
  pipesData: PipeDataType[]
): boolean => {
  // check if birdData is too far away for collision
  if (
    (birdData.x + BIRD_PROPS.WIDTH < pipesData[0].offsetX ||
      birdData.x > pipesData[0].offsetX + PIPE_PROPS.WIDTH) &&
    birdData.y < tmp_canvas_height - BASE_PROPS.HEIGHT
  ) {
    return false;
  }

  const topBird = birdData.y;
  const bottomBird = birdData.y + BIRD_PROPS.HEIGHT;
  const topGap = pipesData[0].offsetY + PIPE_PROPS.ONE_PIPE_HEIGHT;
  const bottomGap = topGap + PIPE_PROPS.GAP;

  // check if bird is colliding with pipe
  if (!(topBird > topGap && bottomBird < bottomGap)) {
    // -----------------------------------------------
    // TODO IMPLEMENT COLLISION WITH PIPES!!!!!!!!!!!!!
    // -----------------------------------------------
    //   birdData.collision = true;
    //   console.log("kolizja z rurka");
    //   return true;
    // gameData.state = "over";
  }

  if (bottomBird >= tmp_canvas_height - BASE_PROPS.HEIGHT) {
    birdData.y = tmp_canvas_height - BASE_PROPS.HEIGHT - BIRD_PROPS.HEIGHT + 10;
    birdData.collision = true;
    return true;
  }

  return false;
};
