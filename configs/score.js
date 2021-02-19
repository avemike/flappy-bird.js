import { CANVAS_SIZE } from './canvas';

const SCORE_PROPS = {
  FONT: 'Comic Sans MS',
  FONT_SIZE: 30,
  get X() {
    return (CANVAS_SIZE.WIDTH - this.FONT_SIZE) / 2;
  },
  Y: 70,
};

export default SCORE_PROPS;
