import { EVENTS } from "../../../configs/events";
import { GAME_STATES } from "../../../configs/game";
import { BirdAttributes } from "../../../configs/types";
import { Bird } from "./Bird";

interface Attributes {
  score: number;
  highscore: number;
  collision: boolean;
  socket: SocketIOClient.Socket;
  controlsAdded: boolean;
  controlTheBird(event: KeyboardEvent): void;
}

class PlayerBird extends Bird {
  public score: Attributes["score"] = 0;
  public highscore: Attributes["highscore"] = 0;
  private collision: Attributes["collision"] = false;
  private socket: Attributes["socket"];
  private controlsAdded: Attributes["controlsAdded"] = false;

  private controlTheBird: Attributes["controlTheBird"] = (event: KeyboardEvent) => {
    const isCapsOn = event.getModifierState("CapsLock");
    if (event.key === "w" || (isCapsOn && event.key === "W")) {
      this.socket.emit(EVENTS.JUMP);
    }
  };

  constructor(socket: SocketIOClient.Socket) {
    super(socket);
    this.socket = socket;

    this.setupUpdateListener();
  }

  setupUpdateListener(): void {
    this.socket.on(EVENTS.BIRD, (data: BirdAttributes) => {
      const { x, y, angle, score, highscore, collision, color } = data;
      this.x = x;
      this.y = y;
      this.angle = angle;
      this.score = score;
      this.highscore = highscore;
      this.collision = collision;
      this.color = color;
    });
  }

  private addControls(): void {
    if (!this.controlsAdded && !this.collision) {
      document.addEventListener("keypress", this.controlTheBird);
      this.controlsAdded = !this.controlsAdded;
    }
  }

  private removeControls(): void {
    if (this.controlsAdded && this.collision) {
      document.removeEventListener("keypress", this.controlTheBird);
      this.controlsAdded = !this.controlsAdded;
    }
  }

  manageControls(state: keyof typeof GAME_STATES): void {
    switch (state) {
      case GAME_STATES.STARTED:
        this.addControls();
        break;
      case GAME_STATES.OVER:
        this.removeControls();
        break;
    }
  }
}

export { PlayerBird };
