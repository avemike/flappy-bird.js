import Bird from "./Bird";

// TODO clean this up and make it work

class EnemyBird extends Bird {
  constructor() {
    super();
  }

  update(data: { id: string; multiplayerX: number; y: number; angle: number }): void {
    const { multiplayerX, y, angle } = data;
    this.y = y;
    this.angle = angle;
    this.x = multiplayerX;
  }
}

export default EnemyBird;
