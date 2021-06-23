import { Base } from "./Base";
import { BASE_PROPS } from "../../configs/game";
import { BaseDataType } from "../types";

export class BasesController {
  private bases: Base[];
  constructor() {
    this.bases = [];

    for (let i = 0; i < 20; i += 1) {
      this.bases.push(
        new Base(
          BASE_PROPS.WIDTH,
          BASE_PROPS.HEIGHT,
          BASE_PROPS.WIDTH * i,
          433 - BASE_PROPS.HEIGHT
        )
      );
    }
  }

  get data(): BaseDataType[] {
    return this.bases.map((base) => ({
      width: base.width,
      height: base.height,
      offsetX: base.offsetX,
      offsetY: base.offsetY,
    }));
  }

  run(): void {
    this.bases.forEach((base) => base.run());
  }
}
