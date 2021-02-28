import { Socket } from "socket.io-client";
import { Bird } from "./Bird";
import { BIRD_PROPS } from "../../configs/game";

type Data = {
  x: number;
  y: number;
  momentum: number;
};

export class PlayerBird extends Bird {
  public socket: typeof Socket;
  constructor({ socket }: { socket: typeof Socket }) {
    super();
    this.x = BIRD_PROPS.X;
    this.y = BIRD_PROPS.STARTING_Y;
    this.momentum = 2;

    this.socket = socket;

    // TEMP - DEBUGGING
    setInterval(() => {
      this.socket.emit("jump");
    }, 670);
    // TEMP

    this.setupUpdateSocket();
    this.setupControls();
  }

  setupUpdateSocket(): void {
    this.socket.on("bird", (data: Data) => {
      this.x = data.x;
      this.y = data.y;
      this.momentum = data.momentum;
    });
  }

  setupControls(): void {
    document.addEventListener("keypress", (event) => {
      if (event.key === "w") {
        this.socket.emit("jump");
      }
    });
  }
}
