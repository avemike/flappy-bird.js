const Pipe = require('./Pipe');

class PipesControls {
  constructor() {
    this.pipes = [];
    this.distBetwPipes = 300;
    for (let i = 0; i < 7; i += 1) {
      this.pipes.push(new Pipe(1000 + this.distBetwPipes * i));
    }
  }

  get data() {
    return this.pipes.map((pipe) => ({
      offsetX: pipe.offsetX,
      offsetY: pipe.offsetY,
    }));
  }

  create() {
    const lastPipeOffsetX = this.pipes[this.pipes.length - 1].offsetX;
    this.pipes.push(new Pipe(lastPipeOffsetX + this.distBetwPipes));
  }

  // run every frame
  run() {
    if (this.pipes[0].isOverScreen()) {
      this.pipes.shift();
      this.create();
    }
    this.pipes.forEach((pipe) => {
      pipe.run();
    });
  }
}

module.exports = PipesControls;
