import BACKGROUND_SPR from "url:../../assets/background.jpeg";

class Backgorund {
  private image: HTMLImageElement;

  constructor() {
    this.image = new Image();
    this.image.src = BACKGROUND_SPR;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.drawImage(this.image, 0, -200);
  }
}

export default Backgorund;
