import { EVENTS } from "../../../../configs/events";
import { BIRD_COLORS, BIRD_PROPS } from "../../../../configs/game";
import { getBirdAssets } from "../../../utils/getBirdAssets";

class Bird {
  protected x = BIRD_PROPS.X;
  protected y = BIRD_PROPS.Y;
  protected angle = 0;
  protected color: BIRD_COLORS = BIRD_COLORS.YELLOW;
  private sprites: HTMLImageElement[] = getBirdAssets(this.color);
  private width = BIRD_PROPS.WIDTH;
  private height = BIRD_PROPS.HEIGHT;
  private spritesState = 0;
  private i = 0; // for selecting proper bird image

  constructor(socket: SocketIOClient.Socket) {
    socket.on(EVENTS.BIRD_COLOR_UPDATE, (color: BIRD_COLORS) => {
      this.setColor(color);
    });
  }

  setColor(color: BIRD_COLORS): void {
    if (this.color !== color) this.sprites = getBirdAssets(color);
  }

  draw(ctx: CanvasRenderingContext2D): void {
    this.render(ctx);
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

export { Bird };
