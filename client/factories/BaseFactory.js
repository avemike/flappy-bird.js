// import { CANVAS_SIZE } from "../../configs/canvas";
import BASE_SPR from "url:../../assets/base.png";

class BaseFactory {
  constructor(socket) {
    this.bases = [];

    socket.on("bases", (bases) => {
      this.bases = bases;
    });
  }

  draw(ctx) {
    this.bases.forEach((base) => {
      const baseImg = new Image();
      baseImg.src = BASE_SPR;
      ctx.drawImage(baseImg, base.offsetX, base.offsetY);
      // ctx.fillStyle = "#9485fa";
      // ctx.fillRect(
      //   0,
      //   CANVAS_SIZE.HEIGHT - base.height,
      //   base.width,
      //   base.height
      // );
    });
  }
}

export default BaseFactory;
