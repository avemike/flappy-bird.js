import { EVENTS } from "/configs/events";
import { GAME_STATES } from "/configs/game";
import SCORE_PROPS from "/configs/score";
import { ToDraw } from "/configs/types";

import { BackgroundController } from "../controllers/BackgroundController";
import { BaseController } from "../controllers/BaseController";
import { EnemyBirdsController } from "../controllers/EnemyBirdsController";
import { PipesController } from "../controllers/PipesController";
import { socket } from "../utils/socketSetup";
import { PlayerBird } from "./birds/PlayerBird";

interface GameInfo {
  state: keyof typeof GAME_STATES;
}

class Game {
  private ctx: CanvasRenderingContext2D;
  private bird: PlayerBird;
  private enemyBirds: EnemyBirdsController;
  private toDraw: ToDraw;
  private data: GameInfo;

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
    this.bird = new PlayerBird(socket);
    this.enemyBirds = new EnemyBirdsController(socket);
    this.toDraw = [
      new BackgroundController(),
      new PipesController(socket),
      new BaseController(socket),
      this.bird,
      this.enemyBirds,
    ];

    this.data = {
      state: GAME_STATES.RUNNING,
    };

    socket.on(EVENTS.GAME, (info: GameInfo) => {
      this.data = info;
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

export { Game };
