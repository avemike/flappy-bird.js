import { BASE_PROPS } from "../../configs/game";
import { BaseAttributes } from "../../configs/types";
import { Base } from "../components/Base";
import { getCanvasSize } from "../utils/canvasSize";

export class BasesController {
  private bases: Base[] = [];

  constructor() {
    for (let i = 0; i < 20; i += 1) {
      this.bases.push(
        new Base({
          offsetX: BASE_PROPS.WIDTH * i,
          offsetY: getCanvasSize().HEIGHT - BASE_PROPS.HEIGHT,
        }),
      );
    }
  }

  run(): void {
    this.bases.forEach((base) => base.run());
  }

  get attributes(): BaseAttributes[] {
    return this.bases.map((base) => base.attributes);
  }
}
