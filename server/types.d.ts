export interface BirdDataType {
  x: number;
  y: number;
  momentum: number;
  angle: number;
  score: number;
  highscore: number;
  collision: boolean;
  id: string;
}

export interface BaseDataType {
  width: number;
  height: number;
  offsetX: number;
  offsetY: number;
}

export interface PipeDataType {
  offsetX: number;
  offsetY: number;
}
