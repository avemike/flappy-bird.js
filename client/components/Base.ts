import { CTX, BASE_SPR, CANVAS_SIZE } from "../../configs/canvas";
import { BG_SPEED } from "../../configs/game";

export class Base {
  public width: number;
  public height: number;
  public offsetX: number;
  public offsetY: number;

  constructor(width: number, height: number, offsetX: number) {
    this.width = width;
    this.height = height;
    this.offsetX = offsetX;
    this.offsetY = CANVAS_SIZE.HEIGHT - this.height;
  }

  render(): void {
    CTX.drawImage(BASE_SPR, this.offsetX, this.offsetY);
  }

  changeOffset(): void {
    this.offsetX -= BG_SPEED;
  }

  draw(): void {
    this.changeOffset();
    this.isOverScreen();
    this.render();
  }

  isOverScreen(): void {
    if (this.offsetX < -this.width) {
      this.offsetX += 20 * 336;
    }
  }
}
