export type BirdData = {
  x: number;
  y: number;
  momentum: number;
  id?: string;
};

export class BirdControls {
  public data: BirdData = {
    x: 100,
    y: 100,
    momentum: 2,
  };
  constructor(id: string) {
    this.data.id = id;
  }

  jump(): void {
    this.data.momentum = -5.8;
  }

  gravity(): void {
    const { momentum } = this.data;
    if (momentum < 10) {
      this.data.momentum += 0.3;
    }
    this.data.y += momentum;
  }
}
