import { BASE_PROPS, BG_SPEED } from "../../configs/game";
import { BaseAttributes } from "../types";

interface Props {
  offsetX: number;
  offsetY: number;
}
export class Base {
  private width: number;
  private height: number;
  private offsetX: number;
  private offsetY: number;

  constructor({ offsetX, offsetY }: Props) {
    this.width = BASE_PROPS.WIDTH;
    this.height = BASE_PROPS.HEIGHT;
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

  get attributes(): BaseAttributes {
    return {
      width: this.width,
      height: this.height,
      offsetX: this.offsetX,
      offsetY: this.offsetY,
    };
  }
}
