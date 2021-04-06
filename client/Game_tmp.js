// import { CTX } from "../configs/canvas";
import SCORE_PROPS from "../configs/score";

class Game_tmp {
  constructor(ctx, bird, enemyBirds, bases, pipes, socket) {
    this.ctx = ctx;
    this.bird = bird;
    this.bases = bases;
    this.pipes = pipes;
    this.enemyBirds = enemyBirds;
    this.toDraw = [pipes, bases, bird, enemyBirds];
    this.data = {
      state: "running",
    };
    this.socket = socket;

    socket.on("game", (data) => {
      this.data = data;
      // setGameState(this.data.state);
    });

    this.setupControls();
  }

  renderScore() {
    this.ctx.fillStyle = "black";
    this.ctx.font = `${SCORE_PROPS.FONT_SIZE}px ${SCORE_PROPS.FONT}`;
    this.ctx.fillText(this.bird.score, SCORE_PROPS.X, SCORE_PROPS.Y);
    this.ctx.font = `${SCORE_PROPS.FONT_SIZE - 10}px ${SCORE_PROPS.FONT}`;
    this.ctx.fillText(
      this.bird.highscore,
      SCORE_PROPS.X + 20,
      SCORE_PROPS.Y + 20
    );
  }

  setupControls() {
    this.ctx.canvas.addEventListener("click", () => {
      if (this.data.state === "running") {
        this.socket.emit("start game");
      }

      if (this.data.state === "over") {
        this.socket.emit("restart");
      }
    });
  }

  // changeComponents() {
  //   const [cleaner, pipes, bases, bird, enemyBirdsFactory] = this.components;
  //   switch (this.data.state) {
  //     case "running":
  //       this.toDraw = [cleaner, bases, enemyBirdsFactory, bird];
  //       break;

  //     case "started":
  //       this.toDraw = this.components;
  //       break;

  //     case "over":
  //       this.toDraw = [cleaner, pipes, bases, bird];
  //       break;

  //     default:
  //       break;
  //   }
  // }

  create_tmp() {
    this.bird.manageControls(this.data.state);

    // this.bird.angleControl(this.data.state);
    // execute all draw animations within given objects
    this.toDraw.forEach((object) => {
      object.draw(this.ctx);
    });

    this.renderScore();
  }
}

export default Game_tmp;
