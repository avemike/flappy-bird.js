const { pipeProps, backgroundSpeed } = require('./constants');

class Pipe {
  constructor(offsetX) {
    const max = -100;
    const min = -400; // temp, we need to calc this
    this.offsetX = offsetX;
    this.offsetY = Math.floor(Math.random() * (max - min)) + min;
  }

  isOverScreen() {
    return this.offsetX <= -pipeProps.width;
  }

  changeOffset() {
    this.offsetX -= backgroundSpeed;
  }

  run() {
    this.changeOffset();
  }
}

module.exports = Pipe;
