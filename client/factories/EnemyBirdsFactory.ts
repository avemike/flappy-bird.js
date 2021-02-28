import { BirdInfo } from "client/types";
import { Socket } from "socket.io-client";
import { EnemyBird } from "../components/EnemyBird";

// EnemyBirdsFactory creates new EnemyBirds and updates existing ones
export class EnemyBirdsFactory {
  public storedBirds: Record<number, EnemyBird> = {};
  constructor(socket: typeof Socket) {
    socket.on("otherBird", (bird: BirdInfo) => {
      this.use(bird);
    });
    socket.on("otherBirdDc", (birdId: number) => {
      delete this.storedBirds[birdId];
    });
  }

  use(bird: BirdInfo): unknown {
    if (!this.storedBirds[bird.id]) {
      // create new bird
      const newBird = new EnemyBird({ bird });
      this.storedBirds[bird.id] = newBird;
      return;
    }
    // update existing bird
    this.storedBirds[bird.id].update(bird);
  }

  draw(): void {
    Object.keys(this.storedBirds).forEach((birdId) => {
      this.storedBirds[+birdId].draw();
    });
  }
}
