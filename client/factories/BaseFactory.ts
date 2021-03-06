import BASE_SPR from "url:../../assets/base.jpg";

class BaseFactory {
  private basesData: BaseData[] = [];
  constructor(socket: SocketIOClient.Socket) {
    socket.on("bases", (basesData: BaseData[]) => {
      this.basesData = basesData;
    });
  }

  draw(ctx: CanvasRenderingContext2D): void {
    this.basesData.forEach((base) => {
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
