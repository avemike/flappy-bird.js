const { checkCollisions } = require('../utils/checkCollisions');

class GameControls {
  constructor(bird, pipes, bases, socket, frameControl) {
    this.bird = bird;
    this.pipes = pipes;
    this.frameControl = frameControl;
    this.data = {
      state: 'running',
    };

    socket.on('start game', () => {
      this.data.state = 'started';
      this.frameControl.addCallback(bird.gravity.bind(bird));
      this.frameControl.addCallback(pipes.run.bind(pipes));
      this.frameControl.addCallback(() =>
        checkCollisions(bird.data, pipes.data, this.data)
      );
      this.frameControl.addCallback(this.checkIfOver.bind(this));
    });
  }

  checkIfOver() {
    if (this.data.state == 'over') {
      this.frameControl.reset();
      this.frameControl.addCallback(this.bird.gravity.bind(this.bird));
      this.frameControl.addCallback(() =>
        checkCollisions(this.bird.data, this.pipes.data, this.data)
      );
    }
  }
}

module.exports = { GameControls };
