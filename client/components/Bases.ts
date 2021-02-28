import { Base } from "./Base";

export class Bases {
  public bases: Base[] = [];
  constructor() {
    for (let i = 0; i < 20; i += 1) {
      this.bases.push(new Base(336, 112, 336 * i));
    }
  }

  draw(): void {
    this.bases.forEach((base) => base.draw());
  }
}
