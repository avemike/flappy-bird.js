import { CanvasSizeAttributes } from "../../configs/canvas";

const SERVER_CAVNAS_SIZE: CanvasSizeAttributes = { HEIGHT: 0, WIDTH: 0 };

export function getCanvasSize(): CanvasSizeAttributes {
  return SERVER_CAVNAS_SIZE;
}

export function setCanvasSize(newSize: CanvasSizeAttributes) {
  SERVER_CAVNAS_SIZE.HEIGHT = newSize.HEIGHT;
  SERVER_CAVNAS_SIZE.WIDTH = newSize.WIDTH;
}
