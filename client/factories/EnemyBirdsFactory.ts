import EnemyBird from "../components/birds/EnemyBird";

// EnemyBirdsFactory creates new EnemyBirds and updates existing ones
class EnemyBirdsFactory {
  private storedBirds: {
    [k: string]: EnemyBird;
  } = {};

  constructor(socket: SocketIOClient.Socket) {
    socket.on("otherBird", (bird: { id: string; y: number; momentum: number }) => {
      this.use(bird);
    });
    socket.on("otherBirdDc", (birdId: string) => {
      delete this.storedBirds[birdId];
    });
  }

  use(bird: { id: string; y: number; momentum: number }): void {
    if (!this.storedBirds[bird.id]) {
      // create new bird
      const newBird = new EnemyBird(bird, "pink");
      this.storedBirds[bird.id] = newBird;
      return;
    }
    // update existing bird
    this.storedBirds[bird.id].update(bird);
  }

  draw(ctx: CanvasRenderingContext2D): void {
    Object.keys(this.storedBirds).forEach((birdId) => {
      this.storedBirds[birdId].draw(ctx);
    });
  }
}

export default EnemyBirdsFactory;
