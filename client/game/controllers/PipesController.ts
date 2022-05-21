import PIPE_SPR from "url:~assets/pipes.jpg";

import { EVENTS } from "~configs/events";
import { PipeAttributes } from "~configs/types";

class PipesController {
  private pipes: PipeAttributes[] = [];
  private pipeImg = new Image();

  constructor(socket: SocketIOClient.Socket) {
    this.pipeImg.src = PIPE_SPR;

    socket.on(EVENTS.PIPES, (pipes: PipeAttributes[]) => {
      this.pipes = pipes;
    });
  }

  draw(ctx: CanvasRenderingContext2D) {
    this.pipes.forEach((pipe) => {
      ctx.drawImage(this.pipeImg, pipe.offsetX, pipe.offsetY);
    });
  }
}

export { PipesController };
