export const CANVAS = document.querySelector("#app") as HTMLCanvasElement;
export const CTX = CANVAS.getContext("2d");
export const BASE_SPR = document.querySelector(".base") as HTMLImageElement;
export const PIPE_SPR = document.querySelector(".pipe") as HTMLImageElement;
export const BIRD_STATES_SPR = [...document.querySelectorAll(".bird")].map(
  (sprite) => sprite as HTMLImageElement
);
export const CANVAS_SIZE = {
  HEIGHT: window.innerHeight * 0.6,
  WIDTH: window.innerWidth * 0.2,
};
