import BASE_SPR from "url:~assets/base.jpg";

import { EVENTS } from "~configs/events";
import { BaseAttributes } from "~configs/types";

class BaseController {
  private basesData: BaseAttributes[] = [];
  private baseImg = new Image();
  constructor(socket: SocketIOClient.Socket) {
    this.baseImg.src = BASE_SPR;

    socket.on(EVENTS.BASES, (basesData: BaseAttributes[]) => {
      this.basesData = basesData;
    });
  }

  draw(ctx: CanvasRenderingContext2D) {
    this.basesData.forEach((base) => {
      ctx.drawImage(this.baseImg, base.offsetX, base.offsetY);
    });
  }
}

export { BaseController };
