import { CANVAS, CANVAS_SIZE } from '../../configs/canvas';

export default function setCanvasSize() {
  CANVAS.width = CANVAS_SIZE.WIDTH;
  // CANVAS.height = CANVAS_SIZE.HEIGHT;
  CANVAS.height = 433;
  // console.log(CANVAS.height);
}
