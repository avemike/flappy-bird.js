import { ctx, bird, birdProps } from './constants';

class Bird {
  constructor() {
    this.ctx = ctx;
    this.sprites = bird;
    this.width = birdProps.width;
    this.ratio = 12 / 17;
    this.x = birdProps.x;
    this.y = birdProps.startingY;
    this.speed = 0;
    this.momentum = 2;

    // Controls
    document.addEventListener('keypress', (event) => {
      if (event.key === 'w') this.momentum = -3.4;
    });
  }

  gravity() {
    const { momentum } = this;

    if (momentum < 5) {
      this.momentum += 0.17;
    }
  }

  move() {
    const { momentum } = this;
    this.y += momentum * 2;
  }

  draw() {
    this.render();
    this.gravity();
    this.move();
  }

  render() {
    const { sprites, x, y, width, ratio } = this;
    ctx.drawImage(sprites, x, y, width, width * ratio);
  }
}
export default Bird;
