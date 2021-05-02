import bird_spr from "../utils/getBirdAssets";
import { BIRD_PROPS } from "../../configs/game";

class Bird {
  protected x = BIRD_PROPS.X;
  protected y = BIRD_PROPS.STARTING_Y;
  protected angle = 0;
  private sprites = bird_spr;
  private width = BIRD_PROPS.WIDTH;
  private height = BIRD_PROPS.HEIGHT;
  private state = 0;
  private i = 0; // for selecting proper bird image

  draw(ctx: CanvasRenderingContext2D) {
    // if (state === "running") {
    //   this.render(ctx);
    // } else {
    // }
    this.render(ctx);
  }

  tmp_render(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "#85facf";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  render(ctx: CanvasRenderingContext2D) {
    const { sprites, x, y, width, height, angle } = this;
    const renderSelectedState = (state: number) => {
      ctx.save();
      ctx.translate(x + width / 2, y + height / 2);
      ctx.rotate(angle);
      ctx.drawImage(sprites[state], -width / 2, -height / 2, width, height);
      ctx.restore();
    };

    // every few frames change bird image, used to prevent changing every frame
    this.i += 1;
    if (this.i % 5 === 0) {
      if (this.state < 2) {
        this.state += 1;
      } else {
        this.state = 0;
      }
    }

    renderSelectedState(this.state);
  }
}

export default Bird;
