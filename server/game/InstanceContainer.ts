import { Socket } from "socket.io";

import { Bird } from "../components/Bird";
import { BasesController } from "../controllers/BasesController";
import { PipesController } from "../controllers/PipesController";
import { FrameHandler } from "../utils/FrameHandler";

export interface Attributes {
  id: Socket["id"];
  socket: Socket;

  bird: Bird;
  pipes: PipesController;
  bases: BasesController;
  frameHandler: FrameHandler;
}

export abstract class InstanceContainer {
  protected id = "";
  protected socket: Attributes["socket"];

  protected bird: Attributes["bird"];
  protected pipes: Attributes["pipes"];
  protected bases: Attributes["bases"];
  protected frameHandler: Attributes["frameHandler"];

  protected constructor(socket: Socket) {
    this.id = socket.id;

    this.bird = new Bird(socket);
    this.socket = socket;
    this.pipes = new PipesController();
    this.bases = new BasesController();
    this.frameHandler = new FrameHandler();

    this.frameHandler.addCallback(() => this.bases.run());
  }

  get attributes(): Attributes {
    return {
      id: this.id,
      socket: this.socket,
      bird: this.bird,
      pipes: this.pipes,
      bases: this.bases,
      frameHandler: this.frameHandler,
    };
  }
}
