import { Socket } from "socket.io";

import { EVENTS } from "../../configs/events";
import { BASE_PROPS, BG_SPEED, BIRD_COLORS, BIRD_PROPS, PIPE_PROPS } from "../../configs/game";
import { BirdAttributes, PipeAttributes } from "../../configs/types";
import { onBirdColorChange } from "../handlers/general";
import { getCanvasSize } from "../utils/canvasSize";

export class Bird {
  public id = "";
  private x = BIRD_PROPS.X;
  private multiplayerX = BIRD_PROPS.X;
  private y = BIRD_PROPS.Y;
  private momentum = BIRD_PROPS.MOMENTUM;
  private angle = 0;
  private score = 0;
  private highscore = 0;
  private collision = BIRD_PROPS.COLLISION;

  private color: BIRD_COLORS = BIRD_COLORS.YELLOW;

  constructor(socket: Socket) {
    this.id = socket.id;

    socket.on(EVENTS.BIRD_COLOR_CHANGE, onBirdColorChange);
  }

  setColor(color: BIRD_COLORS) {
    this.color = color;
  }

  resetState() {
    const { X, Y, MOMENTUM, COLLISION } = BIRD_PROPS;

    this.x = X;
    this.multiplayerX = X;
    this.y = Y;
    this.momentum = MOMENTUM;
    this.angle = 0;
    this.collision = COLLISION;
    this.score = 0;
  }

  checkIfScored(pipesData: PipeAttributes[]): boolean {
    const middleOfPipe = pipesData[0].offsetX + PIPE_PROPS.WIDTH / 2;
    const middleOfBird = this.x + BIRD_PROPS.WIDTH / 2;

    const distBetweenBirdAndPipe = middleOfBird - middleOfPipe;
    // check if bird is in the middle of the closest pipe in X axis

    return (
      distBetweenBirdAndPipe < BG_SPEED && distBetweenBirdAndPipe >= 0 && this.collision === false
    );
  }

  updateScore(pipesData: PipeAttributes[]) {
    if (this.checkIfScored(pipesData)) {
      this.score += 1;
    }
  }

  setHighscore() {
    this.highscore = this.score;
  }

  jump() {
    this.momentum = -5.8;
  }

  gravity() {
    if (this.momentum < 10) this.momentum += 0.3;

    this.y += this.momentum;
  }

  deathSlide() {
    if (this.multiplayerX > -BIRD_PROPS.WIDTH) this.multiplayerX -= BG_SPEED;
  }

  angleControl() {
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
      multiplayerX: this.multiplayerX,
      y: this.y,
      momentum: this.momentum,
      angle: this.angle,
      score: this.score,
      highscore: this.highscore,
      collision: this.collision,
      color: this.color,
    };
  }

  checkPipeCollision(pipesAttribs: PipeAttributes[]): boolean {
    // check if bird is too far away for collision
    if (
      (this.x + BIRD_PROPS.WIDTH < pipesAttribs[0].offsetX ||
        this.x > pipesAttribs[0].offsetX + PIPE_PROPS.WIDTH) &&
      // this.y < tmp_canvas_size - BASE_PROPS.HEIGHT
      this.y < getCanvasSize().HEIGHT - BASE_PROPS.HEIGHT
    )
      return false;

    const topBird = this.y;
    const bottomBird = this.y + BIRD_PROPS.HEIGHT;
    const topGap = pipesAttribs[0].offsetY + PIPE_PROPS.ONE_PIPE_HEIGHT;
    const bottomGap = topGap + PIPE_PROPS.GAP;

    if (!(topBird > topGap && bottomBird < bottomGap)) return true;

    return false;
  }

  resolvePipeCollision(pipesAttribs: PipeAttributes[]) {
    this.collision = true;
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

    if (dx < dy) this.x -= Math.abs(dx);
  }

  checkGroundCollsion(): boolean {
    const bottomRotatedBird = this.y + BIRD_PROPS.WIDTH;

    if (bottomRotatedBird >= getCanvasSize().HEIGHT - BASE_PROPS.HEIGHT) return true;
    // if (bottomRotatedBird >= tmp_canvas_size - BASE_PROPS.HEIGHT) return true;

    return false;
  }

  resolveGroundCollision() {
    this.collision = true;
    this.y = getCanvasSize().HEIGHT - BASE_PROPS.HEIGHT - BIRD_PROPS.WIDTH / 2;
  }
}
