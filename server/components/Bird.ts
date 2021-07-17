import { BASE_PROPS, BG_SPEED, BIRD_PROPS, PIPE_PROPS, tmp_canvas_size } from "../../configs/game";
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

    return distBetweenBirdAndPipe < BG_SPEED && distBetweenBirdAndPipe >= 0 && this.collision === false;
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
    if (this.momentum > 0 && this.angle < BIRD_PROPS.MAX_ANGLE) this.angle += this.momentum / 120;
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

  getCollision(): boolean {
    return this.collision;
  }

  checkPipeCollision(pipesAttribs: PipeAttributes[]): boolean {
    // check if bird is too far away for collision
    if (
      (this.x + BIRD_PROPS.WIDTH < pipesAttribs[0].offsetX || this.x > pipesAttribs[0].offsetX + PIPE_PROPS.WIDTH) &&
      this.y < tmp_canvas_size - BASE_PROPS.HEIGHT
    )
      return false;

    const topBird = this.y;
    const bottomBird = this.y + BIRD_PROPS.HEIGHT;
    const topGap = pipesAttribs[0].offsetY + PIPE_PROPS.ONE_PIPE_HEIGHT;
    const bottomGap = topGap + PIPE_PROPS.GAP;

    if (!(topBird > topGap && bottomBird < bottomGap)) return true;

    return false;
  }

  resolvePipeCollision(pipesAttribs: PipeAttributes[]): void {
    const rightBird = this.x + BIRD_PROPS.WIDTH;
    const topBird = this.y;

    const dx = rightBird - pipesAttribs[0].offsetX;

    let dy = 0;

    if (this.momentum <= 0) {
      // going up
      this.momentum = 0;
      dy = Math.abs(pipesAttribs[0].offsetY + PIPE_PROPS.ONE_PIPE_HEIGHT - topBird);
      if (dy < dx) this.y += dy;
    }
    /*
     else {
    falling
    dy = pipesAttribs[0].offsetY + PIPE_PROPS.ONE_PIPE_HEIGHT + PIPE_PROPS.GAP - bottomBird;
    if (dy < dx) this.y -= Math.abs(dy);
    }
    */

    if (dx < dy) this.x -= Math.abs(dx);
    this.collision = true;
  }

  checkGroundCollsion(): boolean {
    const bottomRotatedBird = this.y + BIRD_PROPS.WIDTH;

    if (bottomRotatedBird >= tmp_canvas_size - BASE_PROPS.HEIGHT) return true;

    return false;
  }

  resolveGroundCollision(): void {
    this.collision = true;
    this.y = tmp_canvas_size - BASE_PROPS.HEIGHT - BIRD_PROPS.WIDTH / 2;
  }
}
