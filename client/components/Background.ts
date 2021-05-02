import theme from "url:../../assets/background-day-fix2-min.jpeg";

class Backgorund {
  private image: HTMLImageElement;

  constructor() {
    this.image = new Image();
    this.image.src = theme;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(this.image, 0, -200);
  }
}

export default Backgorund;
