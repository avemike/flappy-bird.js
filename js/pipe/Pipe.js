import { ctx, pipe } from '../constants';

class Pipe {
  constructor(width, height, offsetX) {
    this.width = width;
    this.height = height;
    this.offsetX = offsetX;
    const max = 0;
    const min = 0;
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
