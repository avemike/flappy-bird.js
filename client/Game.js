import { CTX } from "../configs/canvas";
import SCORE_PROPS from "../configs/score";

class Game {
  constructor({ cleaner, pipes, bases, bird, enemyBirdsFactory, socket }) {
    this.components = [cleaner, pipes, bases, bird, enemyBirdsFactory];
    // this.drawable = [cleaner, pipes, bases, enemyBirdsFactory, bird];
    this.toDraw = [cleaner, bases, bird, enemyBirdsFactory];
    this.bird = bird;
    // this.pipes = pipes.pipes;
    // this.bases = bases.bases;
    this.data = {};
    this.socket = socket;

    socket.on("game", (data) => {
      this.data = data;
    });

    this.setupControls();
  }

  renderScore() {
    CTX.fillStyle = "black";
    CTX.font = `${SCORE_PROPS.FONT_SIZE}px ${SCORE_PROPS.FONT}`;
    CTX.fillText(this.bird.score, SCORE_PROPS.X, SCORE_PROPS.Y);
  }

  setupControls() {
    document.addEventListener("click", () => {
      if (this.data.state === "running") {
        this.socket.emit("start game");
      }

      if (this.data.state === "over") {
        this.socket.emit("restart");
      }
    });
  }

  changeComponents() {
    const [cleaner, pipes, bases, bird, enemyBirdsFactory] = this.components;
    switch (this.data.state) {
      case "running":
        this.toDraw = [cleaner, bases, enemyBirdsFactory, bird];
        break;

      case "started":
        this.toDraw = this.components;
        break;

      case "over":
        this.toDraw = [cleaner, pipes, bases, bird];
        break;

      default:
        break;
    }
  }

  create() {
    window.requestAnimationFrame(() => {
      this.socket.emit("frame");

      this.bird.manageControls();
      // execute all draw animations within given objects
      this.changeComponents();

      this.toDraw.forEach((object) => {
        object.draw(this.data.state);
      });

      this.renderScore();
      this.create();
    });
  }
}

export default Game;
