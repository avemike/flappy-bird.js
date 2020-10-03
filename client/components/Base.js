import { CTX, BASE_SPR, CANVAS_SIZE } from '../../configs/canvas';
import { BG_SPEED } from '../../configs/game';

class Base {
  constructor(width, height, offsetX) {
    this.width = width;
    this.height = height;
    this.offsetX = offsetX;
    this.offsetY = CANVAS_SIZE.HEIGHT - this.height;
  }

  render() {
    CTX.drawImage(BASE_SPR, this.offsetX, this.offsetY);
  }

  changeOffset() {
    this.offsetX -= BG_SPEED;
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
