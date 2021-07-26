const tmp_canvas_size = 427;

const PIPE_PROPS = {
  WIDTH: 52,
  HEIGHT: 968,
  GAP: 100,
  ONE_PIPE_HEIGHT: (968 - 100) / 2,
};

const BIRD_PROPS = {
  WIDTH: 25,
  // WIDTH: 17,
  HEIGHT: 12 * (25 / 17), // 25/17 is scale
  // HEIGHT: 12, // 25/17 is scale
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

const ANIMATION_DURATION = {
  seconds: 1,
  miliseconds: 1000,
};

enum MenuState {
  MAIN = "main",
  MULTI_DETAILS = "multi",
  DEATH = "death",
  LOBBY = "lobby",
  DISABLED = "",
}

enum GameMode {
  SINGLE,
  MULTI,
  NOT_SET,
}

enum LobbyMode {
  HOST,
  NORMAL,
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
  LobbyMode,
  tmp_canvas_size,
  ANIMATION_DURATION,
};
