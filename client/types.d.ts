import { BIRD_COLORS } from "../configs/game";

export interface BirdData {
  x: number;
  y: number;
  angle: number;
  color: BIRD_COLORS;
  sprites?: HTMLImageElement[];
}

export interface PlayerBirdData extends BirdData {
  score: number;
  highscore: number;
  collision: boolean;
  socket: SocketIOClient.Socket;
  controlsAdded: boolean;
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
  height: number;
  offsetX: number;
  offsetY: number;
}
