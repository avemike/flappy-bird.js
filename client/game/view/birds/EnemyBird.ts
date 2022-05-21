import { BirdAttributes } from "../../../../configs/types";
import { Bird } from "./Bird";

class EnemyBird extends Bird {
  constructor(socket: SocketIOClient.Socket) {
    super(socket);
  }

  update(data: BirdAttributes) {
    const { multiplayerX, y, angle, color } = data;

    this.setColor(color);
    this.y = y;
    this.angle = angle;
    this.x = multiplayerX;
  }
}

export { EnemyBird };
