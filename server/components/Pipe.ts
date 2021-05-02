// const { PIPE_PROPS, BG_SPEED } = require("../../configs/game");
import { PIPE_PROPS, BG_SPEED } from "../../configs/game";

export class Pipe {
  public offsetX: number;
  public offsetY: number;

  constructor(offsetX: number) {
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

// module.exports = { Pipe };
