import { ctx, pipe as pipeImg } from './constants';

class PipesFactory {
  constructor(socket) {
    this.pipes = [];

    socket.on('pipes', (pipes) => {
      this.pipes = pipes;
    });
  }

  draw() {
    this.pipes.forEach((pipe) => {
      ctx.drawImage(pipeImg, pipe.offsetX, pipe.offsetY);
    });
  }
}

export default PipesFactory;
