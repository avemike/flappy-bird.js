import { BIRD_COLORS } from "../../../configs/game";
import Bird from "./Bird";

export interface EnemyBirdAttributes {
  id: string;
  multiplayerX: number;
  y: number;
  angle: number;
  color: BIRD_COLORS;
}

class EnemyBird extends Bird {
  constructor(socket: SocketIOClient.Socket) {
    super(socket);
  }

  update(data: EnemyBirdAttributes): void {
    const { multiplayerX, y, angle, color } = data;

    this.setColor(color);
    this.y = y;
    this.angle = angle;
    this.x = multiplayerX;
  }
}

export default EnemyBird;
