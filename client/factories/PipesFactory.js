// import { CTX, PIPE_SPR } from '../../configs/canvas';

class PipesFactory {
  constructor(socket) {
    this.pipes = [];

    socket.on("pipes", (pipes) => {
      this.pipes = pipes;
    });
  }

  draw(ctx) {
    this.pipes.forEach((pipe) => {
      // ctx.drawImage(PIPE_SPR, pipe.offsetX, pipe.offsetY);
      ctx.fillStyle = "tomato";
      ctx.fillRect(pipe.offsetX, pipe.offsetY, pipe.width, pipe.height);
      ctx.fillStyle = "blue";
      ctx.fillRect(pipe.offsetX, pipe.offsetY + (968 - 100) / 2, 52, 100);
    });
  }
}

export default PipesFactory;
