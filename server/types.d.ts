export interface BirdAttributes {
  x: number;
  y: number;
  momentum: number;
  angle: number;
  score: number;
  highscore: number;
  collision: boolean;
  id: string;
}

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
