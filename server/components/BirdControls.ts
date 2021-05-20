import { Pipe } from "./Pipe";
import { PIPE_PROPS, BIRD_PROPS, BG_SPEED } from "../../configs/game";
import { BirdDataType } from "../types";

export class BirdControls {
  public data: BirdDataType = {
    x: 100,
    y: 100,
    momentum: 2,
    angle: 0,
    score: 0,
    highscore: 0,
    collision: false,
    id: "",
  };

  constructor(id: string) {
    this.data = { ...this.data, id: id };
  }

  resetState() {
    const { X, STARTING_Y, MOMENTUM, COLLISION } = BIRD_PROPS;
    this.data.x = X;
    this.data.y = STARTING_Y;
    this.data.momentum = MOMENTUM;
    this.data.angle = 0;
    this.data.collision = COLLISION;
    this.data.score = 0;
  }

  checkIfScored(pipesData: Pipe[]) {
    const middleOfPipe = pipesData[0].offsetX + PIPE_PROPS.WIDTH / 2;
    const middleOfBird = this.data.x + BIRD_PROPS.WIDTH / 2;

    const distBetweenBirdAndPipe = middleOfBird - middleOfPipe;
    // check if bird is the middle of the closest pipe in X axis
    if (
      distBetweenBirdAndPipe < BG_SPEED &&
      distBetweenBirdAndPipe >= 0 &&
      this.data.collision === false
    ) {
      console.log("punkt");
      return true;
    }
    return false;
  }

  updateScore(pipesData: Pipe[]) {
    if (this.checkIfScored(pipesData) === true) {
      this.data.score += 1;
    }
  }

  setHighscore() {
    this.data.highscore = this.data.score;
  }

  jump() {
    this.data.momentum = -5.8;
  }

  gravity() {
    const { momentum } = this.data;
    if (momentum < 10) {
      this.data.momentum += 0.3;
    }
    this.data.y += momentum;
  }

  angleControl() {
    if (
      Math.sign(this.data.momentum) === 1 &&
      this.data.angle < BIRD_PROPS.MAX_ANGLE
    ) {
      this.data.angle += this.data.momentum / 120;
    } else if (
      Math.sign(this.data.momentum) === -1 &&
      this.data.angle > BIRD_PROPS.MIN_ANGLE
    ) {
      const missingAngle = (BIRD_PROPS.MIN_ANGLE - this.data.angle) / 3;
      this.data.angle += missingAngle;
    }
  }
}