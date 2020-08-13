import Pipe from './Pipe';
import { canvas, distBetwPipes, pipeProps } from '../constants';

class Pipes {
  constructor() {
    this.pipes = [];
    let i = 0;
    do {
      this.pipes.push(
        new Pipe(
          pipeProps.width,
          pipeProps.height,
          canvas.width + distBetwPipes * i
        )
      );
      i += 1;
    } while (i * pipeProps.width + (i - 1) * distBetwPipes < canvas.width);
  }

  create() {
    const lastPipeOffset = this.pipes[this.pipes.length - 1].offsetX;
    this.pipes.push(new Pipe(52, 320, lastPipeOffset + distBetwPipes));
  }

  draw() {
    if (this.pipes[0].isOverScreen()) {
      this.pipes.shift();
      this.create();
    }
    this.pipes.forEach((pipe) => {
      pipe.draw();
    });
  }
}

export default Pipes;
