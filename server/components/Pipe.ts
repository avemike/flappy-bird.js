import { BG_SPEED, PIPE_PROPS } from "../../configs/game";
import { PipeAttributes } from "../../configs/types";

interface AttributesParameter {
  attributes: PipeAttributes;
}

interface OffsetParameter {
  offsetX: number;
}

type Params = AttributesParameter | OffsetParameter;

function isAttributes(obj: Params): obj is AttributesParameter {
  return (obj as AttributesParameter).attributes !== undefined;
}

export class Pipe {
  private offsetX: number;
  private offsetY: number;

  constructor(object: Params) {
    if (isAttributes(object)) {
      const { offsetX, offsetY } = object.attributes;
      this.offsetX = offsetX;
      this.offsetY = offsetY;
    } else {
      const { offsetX } = object;
      this.offsetX = offsetX;
      this.offsetY = -350; // DEBUG
    }

    // const max = -100;
    // const min = -400; // temp, we need to calc this

    // this.offsetX = offsetX;

    // this.offsetY = -350; // DEBUG
    // this.offsetY = Math.floor(Math.random() * (max - min)) + min;
  }

  isOverScreen(): boolean {
    return this.offsetX <= -PIPE_PROPS.WIDTH;
  }

  changeOffset(): void {
    this.offsetX -= BG_SPEED;
  }

  run(): void {
    this.changeOffset();
  }

  get attributes(): PipeAttributes {
    return {
      offsetX: this.offsetX,
      offsetY: this.offsetY,
    };
  }
}
