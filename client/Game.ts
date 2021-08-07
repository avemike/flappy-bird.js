import { GAME_STATES } from "../configs/game";
import SCORE_PROPS from "../configs/score";
import { EVENTS } from "../server/handlers";
import Backgorund from "./components/Background";
import PlayerBird from "./components/birds/PlayerBird";
import BaseFactory from "./factories/BaseFactory";
import EnemyBirdsFactory from "./factories/EnemyBirdsFactory";
import PipesFactory from "./factories/PipesFactory";

interface DataType {
  state: keyof typeof GAME_STATES;
}

export default class Game {
  private ctx: CanvasRenderingContext2D;
  private bird: PlayerBird;
  private enemyBirds: EnemyBirdsFactory;
  private toDraw: ToDraw;
  private data: DataType;
  private socket: SocketIOClient.Socket;

  constructor(
    ctx: CanvasRenderingContext2D,
    background: Backgorund,
    bird: PlayerBird,
    enemyBirds: EnemyBirdsFactory,
    bases: BaseFactory,
    pipes: PipesFactory,
    socket: SocketIOClient.Socket,
  ) {
    this.ctx = ctx;
    this.bird = bird;
    this.enemyBirds = enemyBirds;
    this.toDraw = [background, pipes, bases, bird, enemyBirds];
    this.data = {
      state: GAME_STATES.RUNNING,
    };
    this.socket = socket;

    this.socket.on(EVENTS.GAME, (data: DataType) => {
      this.data = data;
    });
  }

  renderScore(): void {
    if (this.data.state !== GAME_STATES.RUNNING) {
      this.ctx.fillStyle = "black";
      this.ctx.font = `${SCORE_PROPS.FONT_SIZE}px ${SCORE_PROPS.FONT}`;
      this.ctx.fillText(`${this.bird.score}`, SCORE_PROPS.X, SCORE_PROPS.Y);
      this.ctx.font = `${SCORE_PROPS.FONT_SIZE - 10}px ${SCORE_PROPS.FONT}`;
      this.ctx.fillText(`${this.bird.highscore}`, SCORE_PROPS.X + 20, SCORE_PROPS.Y + 20);
    }
  }

  create_tmp(): void {
    this.bird.manageControls(this.data.state);

    // execute all draw animations within given objects
    this.toDraw.forEach((object) => {
      object.draw(this.ctx);
    });

    this.renderScore();
  }
}
