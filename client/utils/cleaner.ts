import { CTX, CANVAS_SIZE } from "../../configs/canvas";

export const Cleaner = {
  draw(): void {
    CTX.clearRect(0, 0, CANVAS_SIZE.WIDTH, CANVAS_SIZE.HEIGHT);
  },
};
