import { BASE_PROPS, BG_SPEED } from "../../configs/game";
import { BaseAttributes } from "../../configs/types";

type Attributes = BaseAttributes;

interface Params {
  offsetX: Attributes["offsetX"];
  offsetY: Attributes["offsetY"];
}

export class Base {
  private width: Attributes["width"] = BASE_PROPS.WIDTH;
  private height: Attributes["height"] = BASE_PROPS.HEIGHT;
  private offsetX: Attributes["offsetX"];
  private offsetY: Attributes["offsetY"];

  constructor({ offsetX, offsetY }: Params) {
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
