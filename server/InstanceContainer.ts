import { Socket } from "socket.io";
import { Bird } from "./components/Bird";
import { GameControls } from "./components/GameControls";
import { BasesController } from "./controllers/BasesController";
import { PipesController } from "./controllers/PipesController";
import { frameControl } from "./utils/FrameHandler";

interface Attributes {
  id: string;
  bird: Bird;
  pipes: PipesController;
  bases: BasesController;
  game: GameControls;
}

export class InstanceContainer {
  static instanceContainers: { [key: string]: InstanceContainer } = {};

  private id = "";
  private bird: Attributes["bird"];
  private pipes: Attributes["pipes"];
  private bases: Attributes["bases"];
  private game: Attributes["game"];

  private constructor(socket: Socket) {
    this.id = socket.id;

    this.bird = new Bird(socket.id);
    this.pipes = new PipesController();
    this.bases = new BasesController();
    this.game = new GameControls({
      bird: this.bird,
      pipes: this.pipes,
      bases: this.bases,
      socket,
      frameControl,
    });

    frameControl.addCallback(this.bases.run.bind(this.bases));
  }

  public static initialize(socket: Socket): InstanceContainer {
    const instance = new InstanceContainer(socket);

    InstanceContainer.instanceContainers[socket.id] = instance;

    return instance;
  }

  get attributes(): Attributes {
    return {
      id: this.id,
      bird: this.bird,
      pipes: this.pipes,
      bases: this.bases,
      game: this.game,
    };
  }
}
