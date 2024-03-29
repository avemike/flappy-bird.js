export const EVENTS = {
  MULTI_LEAVE: "multi leave",
  MULTI_START_GAME: "multi start game",
  MULTI_JOIN: "multi join",

  LOBBY_CREATE: "lobby create",
  LOBBY_JOIN: "lobby join",
  LOBBY_ABORT: "lobby abort",
  LOBBY_LEAVE: "lobby leave",
  LOBBY_SET: "lobby set",
  LOBBY_KICK_OUT: "lobby kick out",

  BIRD_JOINED: "bird joined",
  CONNECTION: "connection",
  DISCONNECT: "disconnect",
  OTHER_BIRD_DC: "otherBirdDc",

  BIRD: "bird",
  BIRD_COLOR_CHANGE: "bird color change",
  BIRD_COLOR_UPDATE: "bird color update",
  OTHER_BIRD: "otherBird",
  PIPES: "pipes",
  BASES: "bases",
  GAME: "game",
  FRAME: "frame",
  JUMP: "jump",

  GAME_START: "game start",
  GAME_RESTART: "game restart",
  GAME_OVER: "game over",

  READY_ACTION: "ready action",
  READY_COUNT: "ready count",

  DOM_LOADED: "dom loaded",

  LINK_REQ: "req link",
  LINK_RES: "res link",
} as const;
