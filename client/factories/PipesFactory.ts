import PIPE_SPR from "url:../../assets/pipes2.jpg";

class PipesFactory {
  private pipes: PipeData[] = [];
  constructor(socket: SocketIOClient.Socket) {
    socket.on("pipes", (pipes: PipeData[]) => {
      this.pipes = pipes;
    });
  }

  draw(ctx: CanvasRenderingContext2D) {
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
