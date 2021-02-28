import { CTX, BIRD_STATES_SPR } from "../../configs/canvas";
import { BIRD_PROPS } from "../../configs/game";

export class Bird {
  public sprites = BIRD_STATES_SPR;
  public width = BIRD_PROPS.WIDTH;
  public height = BIRD_PROPS.HEIGHT;
  public angle = 0;
  public state = 0;
  public i = 0;
  public momentum = 1;
  public x = BIRD_PROPS.X;
  public y = BIRD_PROPS.STARTING_Y;

  angleControl(): void {
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

  draw(): void {
    this.render();
    this.angleControl();
  }

  render(): void {
    const { sprites, x, y, width, height } = this;
    const renderSelectedState = (state: number) => {
      CTX.save();
      CTX.translate(x + width / 2, y + height / 2);
      CTX.rotate(this.angle);
      CTX.drawImage(sprites[state], -width / 2, -height / 2, width, height);
      CTX.restore();
    };

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
