import { PIPE_PROPS, BG_SPEED } from "../../configs/game";
import { PipeAttributes } from "../types";

export class Pipe {
  private offsetX: number;
  private offsetY: number;

  constructor(offsetX: number) {
    const max = -100;
    const min = -400; // temp, we need to calc this

    this.offsetX = offsetX;
    this.offsetY = Math.floor(Math.random() * (max - min)) + min;
  }

  isOverScreen(): boolean {
    return this.offsetX <= -PIPE_PROPS.WIDTH;
  }

  changeOffset(): void {
    this.offsetX -= BG_SPEED;
  }

  run(): void {
    this.changeOffset();
  }

  get attributes(): PipeAttributes {
    return {
      offsetX: this.offsetX,
      offsetY: this.offsetY,
    };
  }
}
