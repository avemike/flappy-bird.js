import { EVENTS } from "../../configs/events";
import { EnemyBird, EnemyBirdAttributes } from "../view/birds/EnemyBird";

// EnemyBirdsFactory creates new EnemyBirds and updates existing ones
class EnemyBirdsController {
  private socket: SocketIOClient.Socket;

  private storedBirds: {
    [k: string]: EnemyBird;
  } = {};

  constructor(socket: SocketIOClient.Socket) {
    this.socket = socket;

    this.socket.on(EVENTS.OTHER_BIRD, (bird: EnemyBirdAttributes) => {
      this.use(bird);
    });

    this.socket.on(EVENTS.OTHER_BIRD_DC, (birdId: string) => {
      delete this.storedBirds[birdId];
    });
  }

  use(bird: EnemyBirdAttributes): void {
    if (!this.storedBirds[bird.id]) {
      // create new bird
      const newBird = new EnemyBird(this.socket);
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

export { EnemyBirdsController };
