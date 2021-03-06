const PIPE_PROPS = {
  WIDTH: 52,
  HEIGHT: 968,
  GAP: 100,
  ONE_PIPE_HEIGHT: (968 - 100) / 2,
};

const BIRD_PROPS = {
  WIDTH: 25,
  HEIGHT: (25 * 12) / 17,
  X: 100,
  STARTING_Y: 100,
  MAX_ANGLE: Math.PI / 2,
  MIN_ANGLE: -Math.PI / 7,
  MOMENTUM: 2,
  COLLISION: false,
};

const BASE_PROPS = {
  WIDTH: 336,
  HEIGHT: 112,
};

const DIST_BETW_PIPES = 300;
const BG_SPEED = 2;
const UPDATE_MILLISECONDS = 16;

enum MenuState {
  MAIN,
  MULTI_DETAILS,
  DEATH,
  DISABLED,
}

enum GameMode {
  SINGLE,
  MULTI,
  NOT_SET,
}

export {
  PIPE_PROPS,
  BIRD_PROPS,
  BASE_PROPS,
  DIST_BETW_PIPES,
  BG_SPEED,
  UPDATE_MILLISECONDS,
  MenuState,
  GameMode,
};

// module.exports = {
//   BG_SPEED,
//   DIST_BETW_PIPES,
//   PIPE_PROPS,
//   BIRD_PROPS,
//   BASE_PROPS,
//   UPDATE_MILLISECONDS,
// };
