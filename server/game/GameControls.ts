import { Socket } from "socket.io";

import { GAME_STATES as STATES } from "../../configs/game";
import { EVENTS, onRestart, onStartGame } from "../handlers";
import { gameOver } from "../scripts/gameOver";
import { InstanceContainer } from "./InstanceContainer";
import { Attributes } from "./InstanceContainer";

export class GameControls extends InstanceContainer {
  protected static instances: { [key: string]: GameControls } = {};

  public state: keyof typeof STATES = STATES.RUNNING;

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

    pipeCollision && this.bird.resolvePipeCollision(this.pipes.attributes);
    groundCollision && this.bird.resolveGroundCollision();
  }

  get attributes(): Attributes & { state: keyof typeof STATES } {
    return {
      ...super.attributes,
      state: this.state,
    };
  }
}
