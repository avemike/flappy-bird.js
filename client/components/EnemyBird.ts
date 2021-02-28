import { BirdInfo } from "client/types";
import { Bird } from "./Bird";

export class EnemyBird extends Bird {
  constructor({ bird }: { bird: BirdInfo }) {
    super();
    this.x = bird.x;
    this.y = bird.y;
    this.momentum = bird.momentum;
  }

  // updates enemy bird position and momentum based on
  // websocket event inside EnemyBirdsFactory.js
  update(data: { y: number; momentum: number }): void {
    this.y = data.y;
    this.momentum = data.momentum;
  }
}
