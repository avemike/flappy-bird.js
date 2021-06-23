import { BG_SPEED } from "../../configs/game";

export class Base {
  public width: number;
  public height: number;
  public offsetX: number;
  public offsetY: number;

  constructor(width: number, height: number, offsetX: number, offsetY: number) {
    this.width = width;
    this.height = height;
    this.offsetX = offsetX;
    this.offsetY = offsetY;
  }

  changeOffset(): void {
    this.offsetX -= BG_SPEED;
  }

  isOverScreen(): void {
    if (this.offsetX < -this.width) {
      this.offsetX += 20 * 336;
    }
  }

  run(): void {
    this.changeOffset();
    this.isOverScreen();
  }
}

// module.exports = { Base };
