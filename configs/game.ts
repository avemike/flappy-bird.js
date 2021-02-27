export const PIPE_PROPS = {
  WIDTH: 52,
  HEIGHT: 968,
  GAP: 100,
  ONE_PIPE_HEIGHT: (968 - 100) / 2,
};

export const BIRD_PROPS = {
  WIDTH: 25,
  HEIGHT: (25 * 12) / 17,
  X: 100,
  STARTING_Y: 100,
  MAX_ANGLE: Math.PI / 2,
  MIN_ANGLE: -Math.PI / 7,
};

export const DIST_BETW_PIPES = 300;
export const BG_SPEED = 3;
export const UPDATE_MILLISECONDS = 16;
