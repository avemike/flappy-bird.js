import { EVENTS, onRestart, onStartGame } from "../handlers";
import { checkCollisions } from "../utils/checkCollisions";
import { InstanceContainer } from "./InstanceContainer";
import { Socket } from "socket.io";
import { Attributes } from "./InstanceContainer";
import { gameOver } from "../scripts/gameOver";

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

  public static getInstance(id: Attributes["id"]): GameControls {
    return this.instances[id];
  }

  public checkOver(): void {
    if (checkCollisions(this.bird.attributes, this.pipes.attributes))
      gameOver(this.id);
  }

  get attributes(): Attributes & { state: keyof typeof STATES } {
    return {
      ...super.attributes,
      state: this.state,
    };
  }
}
