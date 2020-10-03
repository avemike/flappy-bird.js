import CANVAS_SIZE from './canvas';

export const SCORE_PROPS = {
  FONT: 'Comic Sans MS',
  FONT_SIZE: 30,
  get X() {
    return (CANVAS_SIZE.WIDTH - this.FONT_SIZE) / 2;
  },
  Y: 70,
};