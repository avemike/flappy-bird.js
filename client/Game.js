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

  renderScore() {
    console.log(this.bird.score);
    CTX.fillStyle = 'black';
    CTX.font = `${SCORE_PROPS.FONT_SIZE}px ${SCORE_PROPS.FONT}`;
    CTX.fillText(this.bird.score, SCORE_PROPS.X, SCORE_PROPS.Y);
  }

  create() {
    window.requestAnimationFrame(() => {
      this.socket.emit('frame');
      // execute all draw animations within given objects
      this.drawable.forEach((object) => {
        object.draw();
      });

      this.renderScore(); // TEMP
      this.create();
    });
  }
}

export default Game;
