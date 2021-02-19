import { CTX, BIRD_STATES_SPR } from "../../configs/canvas";
import { BIRD_PROPS } from "../../configs/game";

class Bird {
  constructor() {
    this.sprites = BIRD_STATES_SPR;
    this.width = BIRD_PROPS.WIDTH;
    this.height = BIRD_PROPS.HEIGHT;
    this.angle = 0;
    this.state = 0;
    this.i = 0;
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

  draw(state) {
    if (state === "running") {
      this.render();
    } else {
      this.render();
      this.angleControl();
    }
  }

  render() {
    const { sprites, x, y, width, height } = this;
    const renderSelectedState = (state) => {
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

export default Bird;
