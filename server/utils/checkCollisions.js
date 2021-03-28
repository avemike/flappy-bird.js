const { BIRD_PROPS, PIPE_PROPS, BASE_PROPS } = require("../../configs/game.js");

module.exports.checkCollisions = (birdData, pipesData, gameData) => {
  // check if birdData is too far away for collision
  if (
    (birdData.x + BIRD_PROPS.WIDTH < pipesData[0].offsetX ||
      birdData.x > pipesData[0].offsetX + PIPE_PROPS.WIDTH) &&
    birdData.y < 433 - BASE_PROPS.HEIGHT
  ) {
    return;
  }

  const topBird = birdData.y;
  const bottomBird = birdData.y + BIRD_PROPS.HEIGHT;
  const topGap = pipesData[0].offsetY + PIPE_PROPS.ONE_PIPE_HEIGHT;
  const bottomGap = topGap + PIPE_PROPS.GAP;

  // check if bird is colliding with pipe
  if (!(topBird > topGap && bottomBird < bottomGap)) {
    birdData.collision = true;
    gameData.state = "over";
    // end game for this player
  }

  if (bottomBird >= 433 - BASE_PROPS.HEIGHT) {
    birdData.y = 433 - BASE_PROPS.HEIGHT - BIRD_PROPS.HEIGHT + 10;
    // console.log('gleba');
    birdData.collision = true;
    gameData.state = "over";
  }
};
