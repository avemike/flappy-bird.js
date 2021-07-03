import { PIPE_PROPS, BIRD_PROPS, BG_SPEED } from "../../configs/game";
import { BirdAttributes, PipeAttributes } from "../types";

export class Bird {
  public id = "";
  private x = BIRD_PROPS.X;
  private y = BIRD_PROPS.STARTING_Y;
  private momentum = BIRD_PROPS.MOMENTUM;
  private angle = 0;
  private score = 0;
  private highscore = 0;
  private collision: boolean = BIRD_PROPS.COLLISION;

  constructor(id: string) {
    this.id = id;
  }

  resetState(): void {
    const { X, STARTING_Y, MOMENTUM, COLLISION } = BIRD_PROPS;
    this.x = X;
    this.y = STARTING_Y;
    this.momentum = MOMENTUM;
    this.angle = 0;
    this.collision = COLLISION;
    this.score = 0;
  }

  checkIfScored(pipesData: PipeAttributes[]): boolean {
    const middleOfPipe = pipesData[0].offsetX + PIPE_PROPS.WIDTH / 2;
    const middleOfBird = this.x + BIRD_PROPS.WIDTH / 2;

    const distBetweenBirdAndPipe = middleOfBird - middleOfPipe;
    // check if bird is the middle of the closest pipe in X axis

    return (
      distBetweenBirdAndPipe < BG_SPEED &&
      distBetweenBirdAndPipe >= 0 &&
      this.collision === false
    );
  }

  updateScore(pipesData: PipeAttributes[]): void {
    if (this.checkIfScored(pipesData)) this.score += 1;
  }

  setHighscore(): void {
    this.highscore = this.score;
  }

  jump(): void {
    this.momentum = -5.8;
  }

  gravity(): void {
    if (this.momentum < 10) this.momentum += 0.3;

    this.y += this.momentum;
  }

  angleControl(): void {
    if (this.momentum > 0 && this.angle < BIRD_PROPS.MAX_ANGLE)
      this.angle += this.momentum / 120;
    else if (this.momentum < 0 && this.angle > BIRD_PROPS.MIN_ANGLE) {
      const missingAngle = (BIRD_PROPS.MIN_ANGLE - this.angle) / 3;

      this.angle += missingAngle;
    }
  }

  get attributes(): BirdAttributes {
    return {
      id: this.id,
      x: this.x,
      y: this.y,
      momentum: this.momentum,
      angle: this.angle,
      score: this.score,
      highscore: this.highscore,
      collision: this.collision,
    };
  }
}
