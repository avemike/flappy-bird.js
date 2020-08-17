import { ctx, pipe, pipeProps } from '../constants';

class Pipe {
  constructor(offsetX) {
    const max = -100;
    const min = -400; // temp, we need to calc this
    this.offsetX = offsetX;
    this.offsetY = Math.floor(Math.random() * (max - min)) + min;
  }

  render() {
    ctx.drawImage(pipe, this.offsetX, this.offsetY);
  }

  isOverScreen() {
    return this.offsetX <= -pipeProps.width;
  }

  changeOffset() {
    this.offsetX -= 3;
  }

  draw() {
    this.changeOffset();
    this.render();
  }
}

export default Pipe;
