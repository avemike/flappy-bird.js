import { ctx, bird } from './constants';

class Bird {
  constructor() {
    this.params = {
      ctx,
      sprites: bird,
      width: 30,
      ratio: 12 / 17,
      x: 100,
      y: 100,
      speed: 0,
      momentum: 2,
    };

    // Controls
    document.addEventListener('keypress', (event) => {
      if (event.key === 'w') this.params.momentum = -3.4;
    });
  }

  gravity() {
    const { momentum } = this.params;

    if (momentum < 5) {
      this.params.momentum += 0.17;
    }
  }

  move() {
    const { momentum } = this.params;
    this.params.y += momentum * 2;
  }

  draw() {
    this.render();
    this.gravity();
    this.move();
  }

  render() {
    const { sprites, x, y, width, ratio } = this.params;
    ctx.drawImage(sprites, x, y, width, width * ratio);
  }
}
export default Bird;
