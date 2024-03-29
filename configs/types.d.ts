import { BIRD_COLORS } from "../configs/game";

export interface BirdAttributes {
  x: number;
  multiplayerX: number;
  y: number;
  momentum: number;
  angle: number;
  score: number;
  highscore: number;
  collision: boolean;
  id: string;
  color: BIRD_COLORS;
}

export type ToDraw = [Backgorund, PipesFactory, BaseFactory, PlayerBird, EnemyBirdsFactory];

export interface BaseAttributes {
  width: number;
  height: number;
  offsetX: number;
  offsetY: number;
}

export interface PipeAttributes {
  offsetX: number;
  offsetY: number;
}

export type Link = string;
export type Callback = () => void;
