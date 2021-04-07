import theme from "url:../../assets/background-day-fix2-min.jpeg";

class Backgorund {
  constructor() {
    this.image = new Image();
    this.image.src = theme;
  }

  draw(ctx) {
    ctx.drawImage(this.image, 0, -200);
  }
}

export default Backgorund;
