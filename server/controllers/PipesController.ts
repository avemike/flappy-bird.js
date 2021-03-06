import { DIST_BETW_PIPES } from "../../configs/game";
import { Pipe } from "../components/Pipe";
import { PipeAttributes } from "../types";

export class PipesController {
  private pipes: Pipe[] = [];
  constructor() {
    for (let i = 0; i < 7; i += 1) {
      this.pipes.push(new Pipe(1000 + DIST_BETW_PIPES * i));
    }
  }

  resetState(): void {
    this.pipes = [];
    for (let i = 0; i < 7; i += 1) {
      this.pipes.push(new Pipe(1000 + DIST_BETW_PIPES * i));
    }
  }

  create(): void {
    const lastPipeOffsetX = this.pipes[this.pipes.length - 1].attributes.offsetX;
    this.pipes.push(new Pipe(lastPipeOffsetX + DIST_BETW_PIPES));
  }

  // run every frame
  run(): void {
    if (this.pipes[0].isOverScreen()) {
      this.pipes.shift();
      this.create();
    }

    this.pipes.forEach((pipe) => {
      pipe.run();
    });
  }

  get attributes(): PipeAttributes[] {
    return this.pipes.map((pipe) => pipe.attributes);
  }
}
