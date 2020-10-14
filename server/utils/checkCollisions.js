const { BIRD_PROPS, PIPE_PROPS, BASE_PROPS } = require('../../configs/game.js');

module.exports.checkCollisions = (bird, pipes, gameData) => {
  // check if bird is too far away for collision
  if (
    (bird.x + BIRD_PROPS.WIDTH < pipes[0].offsetX ||
      bird.x > pipes[0].offsetX + PIPE_PROPS.WIDTH) &&
    bird.y < 433 - BASE_PROPS.HEIGHT
  ) {
    return;
  }

  const topBird = bird.y;
  const bottomBird = bird.y + BIRD_PROPS.HEIGHT;
  const topGap = pipes[0].offsetY + PIPE_PROPS.ONE_PIPE_HEIGHT;
  const bottomGap = topGap + PIPE_PROPS.GAP;

  // check if bird is colliding with pipe
  if (!(topBird > topGap && bottomBird < bottomGap)) {
    bird.collision = true;
    gameData.state = 'over';
    // end game for this player
  }

  if (bottomBird >= 433 - BASE_PROPS.HEIGHT) {
    bird.y = 433 - BASE_PROPS.HEIGHT - BIRD_PROPS.HEIGHT + 10;
    // console.log('gleba');
    bird.collision = true;
    gameData.state = 'over';
  }
};
