import { DIST_BETW_PIPES } from "../../configs/game";
import { PipeAttributes } from "../../configs/types";
import { Pipe } from "../components/Pipe";

export class PipesController {
  private pipes: Pipe[] = [];
  constructor() {
    for (let i = 0; i < 7; i += 1) {
      this.pipes.push(new Pipe({ offsetX: 1000 + DIST_BETW_PIPES * i }));
    }
  }

  syncWith(hostPipes: PipesController) {
    this.pipes = [];
    for (let i = 0; i < 7; i += 1) {
      const hostPipeAttrbs = hostPipes.attributes[i];

      this.pipes.push(new Pipe({ attributes: hostPipeAttrbs }));
    }
  }

  resetState() {
    this.pipes = [];
    for (let i = 0; i < 7; i += 1) {
      this.pipes.push(new Pipe({ offsetX: 1000 + DIST_BETW_PIPES * i }));
    }
  }

  create() {
    const lastPipeOffsetX = this.pipes[this.pipes.length - 1].attributes.offsetX;

    this.pipes.push(new Pipe({ offsetX: lastPipeOffsetX + DIST_BETW_PIPES }));
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

  get attributes(): PipeAttributes[] {
    return this.pipes.map((pipe) => pipe.attributes);
  }
}
