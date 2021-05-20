import { Pipe } from "./Pipe";
import { DIST_BETW_PIPES } from "../../configs/game";

export class PipesControls {
  private pipes: Pipe[];
  constructor() {
    this.pipes = [];
    for (let i = 0; i < 7; i += 1) {
      this.pipes.push(new Pipe(1000 + DIST_BETW_PIPES * i));
    }
  }

  get data() {
    return this.pipes;
  }

  resetState() {
    this.pipes = [];
    for (let i = 0; i < 7; i += 1) {
      this.pipes.push(new Pipe(1000 + DIST_BETW_PIPES * i));
    }
  }

  create() {
    const lastPipeOffsetX = this.pipes[this.pipes.length - 1].offsetX;
    this.pipes.push(new Pipe(lastPipeOffsetX + DIST_BETW_PIPES));
  }

  // run every frame
  run() {
    if (this.pipes[0].isOverScreen()) {
      this.pipes.shift();
      this.create();
    }

    this.pipes.forEach((pipe) => {
      pipe.run();
    });
  }
}
