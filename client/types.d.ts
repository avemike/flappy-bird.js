export type Drawable = {
  draw: () => void;
};

type BirdInfo = {
  id?: number;
  x: number;
  y: number;
  momentum: number;
};
