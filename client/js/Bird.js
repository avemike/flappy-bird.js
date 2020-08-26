import { ctx, bird, birdProps } from './constants';

class Bird {
  constructor({ type, socket, birdData }) {
    this.ctx = ctx;
    this.sprites = bird;
    this.width = birdProps.width;
    this.height = birdProps.height;
    this.x = birdData ? birdData.x : birdProps.x;
    this.y = birdData ? birdData.y : birdProps.startingY;
    this.momentum = birdData ? birdData.momentum : 2;
    this.angle = 0;
    this.type = type;

    // skip rest if instance belongs to enemy
    if (type === 'enemy') return;

    this.socket = socket;

    // SET SOCKET
    this.socket.on('bird', (data) => {
      this.x = data.x;
      this.y = data.y;
      this.momentum = data.momentum;
    });

    // TEMP - DEBUGGING
    setInterval(() => {
      this.socket.emit('jump');
    }, 670);
    // TEMP

    // Controls
    document.addEventListener('keypress', (event) => {
      if (event.key === 'w') {
        this.socket.emit('jump');
      }
    });
  }

  angleControl() {
    if (Math.sign(this.momentum) === 1 && this.angle < birdProps.maxAngle) {
      this.angle += this.momentum / 120;
    } else if (
      Math.sign(this.momentum) === -1 &&
      this.angle > birdProps.minAngle
    ) {
      const missingAngle = (birdProps.minAngle - this.angle) / 3;
      this.angle += missingAngle;
      // this.angle += this.momentum / 50;
    }
  }

  // gravity related movement
  move() {
    const { momentum } = this;
    this.y += momentum;
  }

  // for enemy birds, updates position
  update(data) {
    this.y = data.y;
    this.momentum = data.momentum;
  }

  draw() {
    this.render();
    this.angleControl();
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
