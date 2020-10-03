import { BIRD_PROPS, PIPE_PROPS } from '../configs/game';
import { CTX } from '../configs/canvas';
import { SCORE_PROPS } from '../configs/score';

class Game {
  constructor({ cleaner, pipes, bases, bird, enemyBirdsFactory, socket }) {
    this.drawable = [cleaner, pipes, bases, enemyBirdsFactory, bird];
    this.bird = bird;
    this.pipes = pipes.pipes;
    this.collided = false;
    this.score = 0;
    this.highscore = 0;
    this.socket = socket;
  }

  // check if bird is in the middle of the closest pipe and is not colliding with it
  checkIfScored() {
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

  renderScore() {
    CTX.fillStyle = 'black';
    CTX.font = `${SCORE_PROPS.FONT_SIZE}px ${SCORE_PROPS.FONT}`;
    CTX.fillText(this.score, SCORE_PROPS.X, SCORE_PROPS.Y);
  }

  updateScore() {
    if (this.checkIfScored() === true) {
      this.score += 1;
      if (this.score > this.highscore) {
        this.highscore = this.score;
      }
    }
    this.renderScore();
  }

  create() {
    window.requestAnimationFrame(() => {
      this.socket.emit('frame');

      // execute all draw animations within given objects
      this.drawable.forEach((object) => {
        object.draw();
      });
      // this.updateScore(); // TEMP
      this.create();
    });
  }
}

export default Game;
