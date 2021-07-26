import { BASE_PROPS, tmp_canvas_size } from "../../configs/game";
import { Base } from "../components/Base";
import { BaseAttributes } from "../types";

export class BasesController {
  private bases: Base[] = [];

  constructor() {
    for (let i = 0; i < 20; i += 1) {
      this.bases.push(
        new Base({
          offsetX: BASE_PROPS.WIDTH * i,
          offsetY: tmp_canvas_size - BASE_PROPS.HEIGHT,
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
