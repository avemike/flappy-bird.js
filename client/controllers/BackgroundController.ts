import BACKGROUND_SPR from "url:../../assets/background.jpeg";

import { CANVAS_SIZE } from "../../configs/canvas";
import { BACKGROUND_PROPS } from "../../configs/game";

class BackgroundController {
  private images: HTMLImageElement[] = [];

  constructor() {
    for (let i = 0; CANVAS_SIZE.WIDTH < i * BACKGROUND_PROPS.WIDTH; i++) {}
    const image = new Image();
    image.src = BACKGROUND_SPR;

    this.images.push(image);
  }

  draw(ctx: CanvasRenderingContext2D): void {
    this.images.forEach((image, index) => {
      ctx.drawImage(image, index * BACKGROUND_PROPS.WIDTH, -200);
    });
  }
}

export default BackgroundController;
