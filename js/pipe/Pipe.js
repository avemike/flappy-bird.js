import { ctx, pipe } from '../constants';

class Pipe {
  constructor(width, height, offsetX) {
    this.width = width;
    this.height = height;
    this.offsetX = offsetX;
    const max = -100;
    const min = -400; // temp, we need to calc this
    this.offsetY = Math.floor(Math.random() * (max - min)) + min;
  }

  render() {
    ctx.drawImage(pipe, this.offsetX, this.offsetY);
  }

  isOverScreen() {
    return this.offsetX <= -this.width;
  }

  changeOffset() {
    this.offsetX -= 4;
  }

  draw() {
    this.changeOffset();
    this.render();
  }
}

export default Pipe;
