import { EVENTS } from "../../configs/events";
import EnemyBird from "../view/birds/EnemyBird";

// EnemyBirdsFactory creates new EnemyBirds and updates existing ones
class EnemyBirdsController {
  private storedBirds: {
    [k: string]: EnemyBird;
  } = {};

  constructor(socket: SocketIOClient.Socket) {
    // socket.on(EVENTS.OTHER_BIRD, (bird: { id: string; y: number; momentum: number }) => {
    socket.on(EVENTS.OTHER_BIRD, (bird: { id: string; multiplayerX: number; y: number; angle: number }) => {
      this.use(bird);
    });
    socket.on(EVENTS.OTHER_BIRD_DC, (birdId: string) => {
      delete this.storedBirds[birdId];
    });
  }

  // use(bird: { id: string; y: number; momentum: number }): void {
  use(bird: { id: string; multiplayerX: number; y: number; angle: number }): void {
    if (!this.storedBirds[bird.id]) {
      // create new bird
      const newBird = new EnemyBird();
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

export default EnemyBirdsController;
