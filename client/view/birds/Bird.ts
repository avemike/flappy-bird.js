import { BIRD_PROPS } from "../../../configs/game";
import { getBirdAssets } from "../../utils/getBirdAssets";

class Bird {
  protected x = BIRD_PROPS.X;
  protected y = BIRD_PROPS.Y;
  protected angle = 0;
  private sprites: HTMLImageElement[] = getBirdAssets("pink");
  private width = BIRD_PROPS.WIDTH;
  private height = BIRD_PROPS.HEIGHT;
  private spritesState = 0;
  private i = 0; // for selecting proper bird image

  draw(ctx: CanvasRenderingContext2D): void {
    this.render(ctx);
  }

  tmp_render(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = "#85facf";
    // ctx.fillRect(this.x, this.y, this.width, this.height);

    ctx.save();
    ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
    ctx.rotate(this.angle);
    ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
    ctx.restore();
  }

  render(ctx: CanvasRenderingContext2D): void {
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
      if (this.spritesState < 2) {
        this.spritesState += 1;
      } else {
        this.spritesState = 0;
      }
    }
    renderSelectedState(this.spritesState);
  }
}

export default Bird;
