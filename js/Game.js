import { birdProps, pipeProps } from './constants';

class Game {
  //
  constructor({ cleaner, pipes, bases, bird }) {
    this.drawable = [cleaner, pipes, bases, bird];
    this.bird = bird;
    this.pipes = pipes.pipes;
  }

  collisionCheck() {
    // check if bird is too far away for collision
    if (
      this.bird.x + birdProps.width < this.pipes[0].offsetX ||
      this.bird.x > this.pipes[0].offsetX + pipeProps.width
    )
      return;

    const topBird = this.bird.y;
    const bottomBird = this.bird.y + birdProps.height;
    const topGap = this.pipes[0].offsetY + pipeProps.onePipeHeight;
    const bottomGap = topGap + pipeProps.gap;

    // check if bird is colliding
    if (!(topBird > topGap && bottomBird < bottomGap)) {
      console.log('collision');
    }
  }

  create() {
    window.requestAnimationFrame(() => {
      this.collisionCheck();
      // execute all draw animations within given objects
      this.drawable.forEach((object) => {
        object.draw();
      });

      this.create();
    });
  }
}
export default Game;
