import { CTX, PIPE_SPR } from '../../configs/canvas';

class PipesFactory {
  constructor(socket) {
    this.pipes = [];

    socket.on('pipes', (pipes) => {
      this.pipes = pipes;
    });
  }

  draw() {
    this.pipes.forEach((pipe) => {
      CTX.drawImage(PIPE_SPR, pipe.offsetX, pipe.offsetY);
    });
  }
}

export default PipesFactory;
