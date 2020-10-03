const { PIPE_PROPS, BG_SPEED } = require('../../configs/game');

class Pipe {
  constructor(offsetX) {
    const max = -100;
    const min = -400; // temp, we need to calc this
    this.offsetX = offsetX;
    this.offsetY = Math.floor(Math.random() * (max - min)) + min;
  }

  isOverScreen() {
    return this.offsetX <= -PIPE_PROPS.WIDTH;
  }

  changeOffset() {
    this.offsetX -= BG_SPEED;
  }

  run() {
    this.changeOffset();
  }
}

module.exports = { Pipe };
