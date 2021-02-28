import { CANVAS, CANVAS_SIZE } from "../../configs/canvas";

export function setCanvasSize(): void {
  CANVAS.width = CANVAS_SIZE.WIDTH;
  CANVAS.height = CANVAS_SIZE.HEIGHT;
}
