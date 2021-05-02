// const { CTX, BASE_SPR, CANVAS_SIZE } = require('../../configs/canvas');
// const { BG_SPEED } = require("../../configs/game");
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

  changeOffset() {
    this.offsetX -= BG_SPEED;
  }

  isOverScreen() {
    if (this.offsetX < -this.width) {
      this.offsetX += 20 * 336;
    }
  }

  run() {
    this.changeOffset();
    this.isOverScreen();
  }
}

// module.exports = { Base };
