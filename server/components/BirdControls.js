const { PIPE_PROPS, BIRD_PROPS } = require('../../configs/game');

class BirdControls {
  constructor(id) {
    this.data = {
      x: 100,
      y: 100,
      momentum: 2,
      score: 0,
      collision: false,
      id,
    };
  }

  checkIfScored(pipesData) {
    // console.log(pipesData);
    const middleOfPipe = pipesData[0].offsetX + PIPE_PROPS.WIDTH / 2;
    const middleOfBird = this.data.x + BIRD_PROPS.WIDTH / 2;
    const distBetweenBirdAndPipe = middleOfBird - middleOfPipe;

    // check if bird is the middle of the closest pipe in X axis
    if (
      distBetweenBirdAndPipe < 3 &&
      distBetweenBirdAndPipe >= 0 &&
      this.collided === false
    ) {
      /* "&& this.collided === false"   <-- add this condition when collision detection
      will be working */
      return true;
    }
    return false;
  }

  updateScore(pipesData) {
    if (this.checkIfScored(pipesData) === true) {
      this.data.score += 1;
    }
  }

  jump() {
    this.data.momentum = -5.8;
  }

  gravity() {
    const { momentum } = this.data;
    if (momentum < 10) {
      this.data.momentum += 0.3;
    }
    this.data.y += momentum;
  }
}

module.exports = { BirdControls };
