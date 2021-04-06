// import { bird_spr } from "../../configs/canvas";
import { BIRD_PROPS } from "../../configs/game";
import { bird_spr } from "../utils/getBirdAssets";

class Bird {
  constructor() {
    this.sprites = bird_spr;
    this.width = BIRD_PROPS.WIDTH;
    this.height = BIRD_PROPS.HEIGHT;
    this.angle = 0;
    this.state = 0;
    this.i = 0; // for selecting proper bird image
  }

  angleControl() {
    if (Math.sign(this.momentum) === 1 && this.angle < BIRD_PROPS.MAX_ANGLE) {
      this.angle += this.momentum / 120;
    } else if (
      Math.sign(this.momentum) === -1 &&
      this.angle > BIRD_PROPS.MIN_ANGLE
    ) {
      const missingAngle = (BIRD_PROPS.MIN_ANGLE - this.angle) / 3;
      this.angle += missingAngle;
    }
  }

  draw(ctx) {
    // if (state === "running") {
    //   this.render(ctx);
    // } else {
    //   this.angleControl();
    // }
    this.render(ctx);
  }

  tmp_render(ctx) {
    ctx.fillStyle = "#85facf";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  render(ctx) {
    const { sprites, x, y, width, height } = this;
    const renderSelectedState = (state) => {
      ctx.save();
      ctx.translate(x + width / 2, y + height / 2);
      ctx.rotate(this.angle);
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
