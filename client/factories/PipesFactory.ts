import { Socket } from "socket.io-client";
import { CTX, PIPE_SPR } from "../../configs/canvas";

type Pipes = {
  offsetX: number;
  offsetY: number;
}[];
export class PipesFactory {
  public pipes: Pipes = [];
  constructor(socket: typeof Socket) {
    socket.on("pipes", (pipes: Pipes) => {
      this.pipes = pipes;
    });
  }

  draw(): void {
    this.pipes.forEach((pipe) => {
      CTX.drawImage(PIPE_SPR, pipe.offsetX, pipe.offsetY);
    });
  }
}
