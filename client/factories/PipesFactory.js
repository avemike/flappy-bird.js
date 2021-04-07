import PIPE_SPR from "url:../../assets/pipes2.jpg";

class PipesFactory {
  constructor(socket) {
    this.pipes = [];

    socket.on("pipes", (pipes) => {
      this.pipes = pipes;
    });
  }

  draw(ctx) {
    this.pipes.forEach((pipe) => {
      const pipeImg = new Image();
      pipeImg.src = PIPE_SPR;
      ctx.drawImage(pipeImg, pipe.offsetX, pipe.offsetY);
      // ctx.fillStyle = "tomato";
      // ctx.fillRect(pipe.offsetX, pipe.offsetY, pipe.width, pipe.height);
      // ctx.fillStyle = "blue";
      // ctx.fillRect(pipe.offsetX, pipe.offsetY + (968 - 100) / 2, 52, 100);
    });
  }
}

export default PipesFactory;
