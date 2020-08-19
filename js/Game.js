import { birdProps, pipeProps, ctx, scoreProps } from './constants';

class Game {
  constructor({ cleaner, pipes, bases, bird }) {
    this.drawable = [cleaner, pipes, bases, bird];
    this.bird = bird;
    this.pipes = pipes.pipes;
    this.collided = false;
    this.score = 0;
    this.highscore = 0;
  }

  // check if bird is in the middle of the closest pipe and is not colliding with it
  
  checkIfScored() {
    const middleOfPipe = this.pipes[0].offsetX + pipeProps.width / 2;
    const middleOfBird = this.bird.x + birdProps.width / 2;
    const distBetweenBirdAndPipe = middleOfBird - middleOfPipe;

    if (
      distBetweenBirdAndPipe < 3 &&
      distBetweenBirdAndPipe >= 0 &&
      this.collided == false
    ) {
      return true;
    }
  }

  renderScore() {
    ctx.fillStyle = 'black';
    ctx.font = `${scoreProps.fontSize}px ${scoreProps.font}`
    ctx.fillText(this.score, scoreProps.x, scoreProps.y);
  }

  updateScore() {
    if (this.checkIfScored() == true) {
      this.score += 1;
      if(this.score > this.highscore){
        this.highscore = this.score
      }
    }
    this.renderScore();
  }

  collisionCheck() {
    // check if bird is too far away for collision
    if (
      this.bird.x + birdProps.width < this.pipes[0].offsetX ||
      this.bird.x > this.pipes[0].offsetX + pipeProps.width
    ) {
      this.collided = false;
      return;
    }

    const topBird = this.bird.y;
    const bottomBird = this.bird.y + birdProps.height;
    const topGap = this.pipes[0].offsetY + pipeProps.onePipeHeight;
    const bottomGap = topGap + pipeProps.gap;

    // check if bird is colliding
    if (!(topBird > topGap && bottomBird < bottomGap)) {
      this.collided = true;
    }
  }

  create() {
    window.requestAnimationFrame(() => {
      this.collisionCheck();
      // execute all draw animations within given objects
      this.drawable.forEach((object) => {
        object.draw();
      });
      
      this.updateScore();
      this.create();
    });
  }
}

export default Game;