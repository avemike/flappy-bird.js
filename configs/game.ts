export const BACKGROUND_PROPS = {
  WIDTH: 350,
  HEIGHT: 612,
};

export const PIPE_PROPS = {
  WIDTH: 52,
  HEIGHT: 968,
  GAP: 100,
  ONE_PIPE_HEIGHT: (968 - 100) / 2,
};

export const BIRD_PROPS = {
  WIDTH: 25,
  HEIGHT: 12 * (25 / 17), // 25/17 is scale
  X: 100,
  Y: 100,
  MAX_ANGLE: Math.PI / 2,
  MIN_ANGLE: -Math.PI / 7,
  MOMENTUM: 2,
  COLLISION: false,
};

export enum BIRD_COLORS {
  PINK = "pink",
  YELLOW = "yellow",
  BLUE = "blue",
  GREEN = "green",
}

export const BIRD_COLORS_2 = {
  PINK: "pink",
  YELLOW: "yellow",
  BLUE: "blue",
  GREEN: "green",
} as const;

export const BASE_PROPS = {
  WIDTH: 336,
  HEIGHT: 112,
};

export const DIST_BETW_PIPES = 300;
export const BG_SPEED = 2;
export const UPDATE_MILLISECONDS = 16;

export const ANIMATION_DURATION = {
  seconds: 1,
  miliseconds: 1000,
};

export enum MENU_STATE {
  MAIN = "main",
  MULTI_DETAILS = "multi",
  DEATH = "death",
  LOBBY = "lobby",
  DISABLED = "",
}

export enum GAME_MODE {
  SINGLE,
  MULTI,
  NOT_SET,
}

export enum LOBBY_MODE {
  HOST,
  NORMAL,
}

export const GAME_STATES = {
  RUNNING: "RUNNING",
  STARTED: "STARTED",
  OVER: "OVER",
} as const;
