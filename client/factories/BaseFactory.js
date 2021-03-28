import { CANVAS_SIZE } from "../../configs/canvas";

class BaseFactory {
  constructor(socket) {
    this.bases = [];

    socket.on("bases", (bases) => {
      this.bases = bases;
    });
  }

  draw(ctx) {
    this.bases.forEach((base) => {
      // ctx.drawImage(BASE_SPR, base.offsetX, base.offsetY);
      ctx.fillStyle = "#9485fa";
      ctx.fillRect(
        0,
        CANVAS_SIZE.HEIGHT - base.height,
        base.width,
        base.height
      );
    });
  }
}

export default BaseFactory;
