import { Socket } from "socket.io-client";
import { BIRD_PROPS, PIPE_PROPS } from "../configs/game";
import { CTX } from "../configs/canvas";
import { SCORE_PROPS } from "../configs/score";
import { Drawable } from "./types";
import { Bases } from "./components/Bases";
import { Cleaner } from "./utils/cleaner";
import { EnemyBirdsFactory } from "./factories/EnemyBirdsFactory";
import { PipesFactory } from "./factories/PipesFactory";
import { PlayerBird } from "./components/PlayerBird";

type Props = {
  cleaner: typeof Cleaner;
  bases: Bases;
  pipes: PipesFactory;
  bird: PlayerBird;
  enemyBirdsFactory: EnemyBirdsFactory;
  socket: typeof Socket;
};

export class Game {
  public drawable: Drawable[] = [];
  public bird;
  public pipes;
  public collided = false;
  public score = 0;
  public highscore = 0;
  public socket;

  constructor({
    cleaner,
    pipes,
    bases,
    bird,
    enemyBirdsFactory,
    socket,
  }: Props) {
    this.drawable = [cleaner, pipes, bases, enemyBirdsFactory, bird];
    this.bird = bird;
    this.pipes = pipes.pipes;
    this.socket = socket;
  }

  // check if bird is in the middle of the closest pipe and is not colliding with it
  checkIfScored(): boolean {
    const middleOfPipe = this.pipes[0].offsetX + PIPE_PROPS.WIDTH / 2;
    const middleOfBird = this.bird.x + BIRD_PROPS.WIDTH / 2;
    const distBetweenBirdAndPipe = middleOfBird - middleOfPipe;

    if (
      distBetweenBirdAndPipe < 3 &&
      distBetweenBirdAndPipe >= 0 &&
      this.collided === false
    ) {
      return true;
    }
    return false;
  }

  renderScore(): void {
    CTX.fillStyle = "black";
    CTX.font = `${SCORE_PROPS.FONT_SIZE}px ${SCORE_PROPS.FONT}`;
    CTX.fillText(`${this.score}`, SCORE_PROPS.X, SCORE_PROPS.Y);
  }

  updateScore(): void {
    if (this.checkIfScored() === true) {
      this.score += 1;
      if (this.score > this.highscore) {
        this.highscore = this.score;
      }
    }
    this.renderScore();
  }

  create(): void {
    window.requestAnimationFrame(() => {
      this.socket.emit("frame");

      // execute all draw animations within given objects
      this.drawable.forEach((object) => {
        object.draw();
      });
      // this.updateScore(); // TEMP
      this.create();
    });
  }
}
