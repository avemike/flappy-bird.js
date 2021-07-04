import { EVENTS } from "../events/events";
import { checkCollisions } from "../utils/checkCollisions";
import { FrameHandler } from "../utils/FrameHandler";
import { BasesController } from "../controllers/BasesController";
import { Bird } from "./Bird";
import { PipesController } from "../controllers/PipesController";

interface Props {
  bird: Bird;
  pipes: PipesController;
  bases: BasesController;
  socket: SocketIO.Socket;
  frameControl: FrameHandler;
}

const STATES = {
  running: "running",
  started: "started",
  over: "over",
} as const;

export class GameControls {
  private bird: Bird;
  private pipes: PipesController;
  private frameControl: FrameHandler;
  private socket: SocketIO.Socket;
  public state: keyof typeof STATES = STATES.running;

  constructor({ bird, pipes, bases, socket, frameControl }: Props) {
    this.bird = bird;
    this.pipes = pipes;
    this.frameControl = frameControl;
    this.socket = socket;

    this.socket.on(EVENTS.START_GAME, () => {
      // socket.broadcast.emit("start game"); // TODO
      this.state = STATES.started;
      this.frameControl.addCallback(bird.gravity.bind(bird));
      this.frameControl.addCallback(bird.angleControl.bind(bird));
      this.frameControl.addCallback(pipes.run.bind(pipes));
      this.frameControl.addCallback(this.checkOver.bind(this));
    });

    this.socket.on(EVENTS.RESTART, () => {
      this.state = STATES.running;
      this.bird.resetState();
      this.pipes.resetState();
      this.frameControl.reset();
      this.frameControl.addCallback(bases.run.bind(bases));
    });
  }

  checkOver(): void {
    if (checkCollisions(this.bird.attributes, this.pipes.attributes)) {
      this.state = STATES.over;
      this.socket.emit(EVENTS.GAME_OVER);
      this.bird.setHighscore();
      this.frameControl.reset();
      this.frameControl.addCallback(this.bird.gravity.bind(this.bird));
      this.frameControl.addCallback(this.bird.angleControl.bind(this.bird));
      this.frameControl.addCallback(() =>
        checkCollisions(this.bird.attributes, this.pipes.attributes)
      );
    }
  }

  get attributes(): keyof typeof STATES {
    return this.state;
  }
}
