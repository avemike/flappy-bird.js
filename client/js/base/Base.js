import { ctx, base, canvasSize, backgroundSpeed } from '../constants';

class Base {
  constructor(width, height, offsetX) {
    this.width = width;
    this.height = height;
    this.offsetX = offsetX;
    this.offsetY = canvasSize.height - this.height;
  }

  render() {
    ctx.drawImage(base, this.offsetX, this.offsetY);
  }

  changeOffset() {
    this.offsetX -= backgroundSpeed;
  }

  draw() {
    this.changeOffset();
    this.isOverScreen();
    this.render();
  }

  isOverScreen() {
    if (this.offsetX < -this.width) {
      this.offsetX += 20 * 336;
    }
  }
}

export default Base;
