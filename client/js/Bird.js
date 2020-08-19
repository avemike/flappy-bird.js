import { ctx, bird, birdProps } from './constants';

class Bird {
  constructor() {
    this.ctx = ctx;
    this.sprites = bird;
    this.width = birdProps.width;
    this.height = birdProps.height;
    this.x = birdProps.x;
    this.y = birdProps.startingY;
    this.speed = 0;
    this.momentum = 2;
    this.angle = 0;
    // Controls
    document.addEventListener('keypress', (event) => {
      if (event.key === 'w') this.momentum = -5.8;
    });
  }

  gravity() {
    // console.log(this.momentum)
    if (this.momentum < 10) {
      this.momentum += 0.30;
    }
  }

  angleControl() {
    if (Math.sign(this.momentum) === 1 && this.angle < birdProps.maxAngle){
      this.angle += this.momentum / 120;
    } else if (Math.sign(this.momentum) === -1 && this.angle > birdProps.minAngle){
      const missingAngle = (birdProps.minAngle - this.angle) / 3
      this.angle += missingAngle
      // this.angle += this.momentum / 50;
    }
  }

  die(){
    
  }

  // gravity related movement
  move() {
    const { momentum } = this;
    this.y += momentum;
  }

  draw() {
    this.render();
    this.gravity();
    this.angleControl();
    this.move();
  }

  render() {
    const { sprites, x, y, width, height } = this;
    ctx.save();
    ctx.translate(x + width / 2, y + height / 2);
    ctx.rotate(this.angle);
    ctx.drawImage(sprites, -width / 2, -height / 2, width, height);
    ctx.restore();
  }
}

export default Bird;
