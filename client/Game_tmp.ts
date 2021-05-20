import SCORE_PROPS from "../configs/score";
import Backgorund from "./components/Background";
import EnemyBirdsFactory from "./factories/EnemyBirdsFactory";
import PlayerBird from "./components/PlayerBird";
import BaseFactory from "./factories/BaseFactory";
import PipesFactory from "./factories/PipesFactory";

class Game_tmp {
  private ctx: CanvasRenderingContext2D;
  // private background: Backgorund;
  private bird: PlayerBird;
  // private bases: BaseFactory;
  // private pipes: PipesFactory;
  private enemyBirds: EnemyBirdsFactory;
  private toDraw: toDraw;
  private data: { state: string };
  private socket: SocketIOClient.Socket;

  constructor(
    ctx: CanvasRenderingContext2D,
    background: Backgorund,
    bird: PlayerBird,
    enemyBirds: EnemyBirdsFactory,
    bases: BaseFactory,
    pipes: PipesFactory,
    socket: SocketIOClient.Socket
  ) {
    this.ctx = ctx;
    // this.background = background;
    this.bird = bird;
    // this.bases = bases;
    // this.pipes = pipes;
    this.enemyBirds = enemyBirds;
    this.toDraw = [background, pipes, bases, bird, enemyBirds];
    this.data = {
      state: "running",
    };
    this.socket = socket;

    socket.on("game", (data: { state: string }) => {
      this.data = data;
    });

    this.setupControls();
  }

  renderScore(): void {
    this.ctx.fillStyle = "black";
    this.ctx.font = `${SCORE_PROPS.FONT_SIZE}px ${SCORE_PROPS.FONT}`;
    this.ctx.fillText(`${this.bird.score}`, SCORE_PROPS.X, SCORE_PROPS.Y);
    this.ctx.font = `${SCORE_PROPS.FONT_SIZE - 10}px ${SCORE_PROPS.FONT}`;
    this.ctx.fillText(
      `${this.bird.highscore}`,
      SCORE_PROPS.X + 20,
      SCORE_PROPS.Y + 20
    );
  }

  setupControls(): void {
    this.ctx.canvas.addEventListener("click", () => {
      if (this.data.state === "running") {
        this.socket.emit("start game");
      }

      if (this.data.state === "over") {
        this.socket.emit("restart");
      }
    });
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

export default Game_tmp;
