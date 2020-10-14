import { CTX, CANVAS, BASE_SPR } from '../../configs/canvas';

class BaseFactory {
  constructor(socket) {
    this.bases = [];

    socket.on('bases', (bases) => {
      this.bases = bases;
    });
  }

  draw() {
    this.bases.forEach((base) => {
      CTX.drawImage(BASE_SPR, base.offsetX, base.offsetY);
    });
  }
}

export default BaseFactory;
