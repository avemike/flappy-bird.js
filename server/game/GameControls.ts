import { Socket } from "socket.io";

import { EVENTS, onRestart, onStartGame } from "../handlers";
import { gameOver } from "../scripts/gameOver";
import { InstanceContainer } from "./InstanceContainer";
import { Attributes } from "./InstanceContainer";

export const STATES = {
  running: "running",
  started: "started",
  over: "over",
} as const;

export class GameControls extends InstanceContainer {
  protected static instances: { [key: string]: GameControls } = {};

  public state: keyof typeof STATES = STATES.running;

  constructor(socket: Socket) {
    super(socket);

    socket.on(EVENTS.START_GAME, onStartGame(this.id));
    socket.on(EVENTS.RESTART, onRestart(this.id));
  }

  public static initialize(socket: Socket): GameControls {
    const instance = new GameControls(socket);

    GameControls.instances[socket.id] = instance;

    return instance;
  }

  public static removeInstance(id: Attributes["id"]): void {
    delete this.instances[id];
  }

  public static getInstance(id: Attributes["id"]): GameControls {
    return this.instances[id];
  }

  public checkOver(): void {
    const pipeCollision = this.bird.checkPipeCollision(this.pipes.attributes);
    const groundCollision = this.bird.checkGroundCollsion();

    if (pipeCollision || groundCollision) gameOver(this.id);

    // if (this.bird.getCollision()) {
    pipeCollision && this.bird.resolvePipeCollision(this.pipes.attributes);
    groundCollision && this.bird.resolveGroundCollision();
    // }

    // if (this.bird.checkPipeCollision(this.pipes.attributes)) {
    //   this.bird.resolvePipeCollision(this.pipes.attributes);
    //   gameOver(this.id);
    // return;
    // }

    // if (this.bird.checkGroundCollsion()) {
    //   this.bird.resolveGroundCollision();
    //   gameOver(this.id);
    // }
  }

  get attributes(): Attributes & { state: keyof typeof STATES } {
    return {
      ...super.attributes,
      state: this.state,
    };
  }
}
