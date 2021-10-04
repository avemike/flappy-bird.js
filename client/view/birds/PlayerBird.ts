import { EVENTS } from "../../../configs/events";
import { GAME_STATES } from "../../../configs/game";
import { PlayerBirdData } from "../../types";
import Bird from "./Bird";

class PlayerBird extends Bird {
  public score = 0;
  public highscore = 0;
  private collision = false;
  private socket: SocketIOClient.Socket;
  private controlsAdded = false;
  private controlTheBird = (event: KeyboardEvent) => {
    const isCapsOn = event.getModifierState("CapsLock");
    if (event.key === "w" || (isCapsOn && event.key === "W")) {
      this.socket.emit(EVENTS.JUMP);
    }
  };

  constructor(socket: SocketIOClient.Socket) {
    super(socket);
    this.socket = socket;

    // TEMP - DEBUGGING
    /*
    setInterval(() => {
      this.socket.emit('jump');
    }, 670);
    */
    // TEMP

    this.setupUpdateSocket();
  }

  setupUpdateSocket(): void {
    this.socket.on(EVENTS.BIRD, (data: PlayerBirdData) => {
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
      return;
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

export default PlayerBird;
