export interface BirdData {
  x: number;
  y: number;
  angle: number;
  sprites?: HTMLImageElement[];
  width?: number;
  height?: number;
  state?: number;
  i?: number;
}

export interface PlayerBirdData extends BirdData {
  score: number;
  highscore: number;
  collision: boolean;
  socket: SocketIOClient.Socket;
  controlsAdded: boolean;
}

export interface CanvasProps {
  width: number;
  height: number;
}

export type ToDraw = [Backgorund, PipesFactory, BaseFactory, PlayerBird, EnemyBirdsFactory];

export interface BaseData {
  width: number;
  height: number;
  offsetX: number;
  offsetY: number;
}

export interface PipeData {
  width: number;
  width: number;
  height: number;
  offsetX: number;
  offsetY: number;
}
