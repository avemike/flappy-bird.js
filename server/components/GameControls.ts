import { checkCollisions } from "../utils/checkCollisions";
import { FrameHandler } from "../utils/FrameHandler";
import { BasesController } from "./BasesController";
import { BirdController } from "./BirdController";
import { PipesController } from "./PipesController";

export class GameControls {
  private bird: BirdController;
  private pipes: PipesController;
  private frameControl: FrameHandler;
  private socket: SocketIO.Socket;
  public data = { state: "running" };

  constructor(
    bird: BirdController,
    pipes: PipesController,
    bases: BasesController,
    socket: SocketIO.Socket,
    frameControl: FrameHandler
  ) {
    this.bird = bird;
    this.pipes = pipes;
    this.frameControl = frameControl;
    this.socket = socket;
    this.data = {
      state: "running",
    };

    this.socket.on("start game", () => {
      // socket.broadcast.emit("start game"); // TODO
      this.data.state = "started";
      this.frameControl.addCallback(bird.gravity.bind(bird));
      this.frameControl.addCallback(bird.angleControl.bind(bird));
      this.frameControl.addCallback(pipes.run.bind(pipes));
      this.frameControl.addCallback(this.checkOver.bind(this));
    });

    this.socket.on("restart", () => {
      this.data.state = "running";
      this.bird.resetState();
      this.pipes.resetState();
      this.frameControl.reset();
      this.frameControl.addCallback(bases.run.bind(bases));
    });
  }

  checkOver(): void {
    if (checkCollisions(this.bird.data, this.pipes.data)) {
      this.data.state = "over";
      this.socket.emit("game over");
      this.bird.setHighscore();
      this.frameControl.reset();
      this.frameControl.addCallback(this.bird.gravity.bind(this.bird));
      this.frameControl.addCallback(this.bird.angleControl.bind(this.bird));
      this.frameControl.addCallback(() =>
        checkCollisions(this.bird.data, this.pipes.data)
      );
    }
  }
}

// module.exports = { GameControls };
