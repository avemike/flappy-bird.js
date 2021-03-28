const { PIPE_PROPS, BIRD_PROPS } = require("../../configs/game");

class BirdControls {
  constructor(id) {
    this.data = {
      x: 100,
      y: 100,
      momentum: 2,
      score: 0,
      highscore: 0,
      collision: false,
      id,
    };
  }

  resetState() {
    const { X, STARTING_Y, MOMENTUM, COLLISION } = BIRD_PROPS;
    this.data.x = X;
    this.data.y = STARTING_Y;
    this.data.momentum = MOMENTUM;
    this.data.collision = COLLISION;
    this.data.score = 0;
  }

  checkIfScored(pipesData) {
    const middleOfPipe = pipesData[0].offsetX + PIPE_PROPS.WIDTH / 2;
    const middleOfBird = this.data.x + BIRD_PROPS.WIDTH / 2;

    const distBetweenBirdAndPipe = middleOfBird - middleOfPipe;
    // check if bird is the middle of the closest pipe in X axis
    if (
      distBetweenBirdAndPipe < 3 &&
      distBetweenBirdAndPipe >= 0 &&
      this.data.collision === false
    ) {
      console.log("punkt");
      return true;
    }
    return false;
  }

  updateScore(pipesData) {
    if (this.checkIfScored(pipesData) === true) {
      this.data.score += 1;
    }
  }

  setHighscore() {
    this.data.highscore = this.data.score;
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
