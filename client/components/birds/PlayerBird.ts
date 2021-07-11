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
      this.socket.emit("jump");
    }
  };

  constructor(socket: SocketIOClient.Socket) {
    super();
    this.socket = socket;

    // TEMP - DEBUGGING
    /*
    setInterval(() => {
      this.socket.emit('jump');
    }, 670);
    */
    // TEMP

    this.setupUpdateSocket();
    this.manageControls();
  }

  setupUpdateSocket(): void {
    this.socket.on("bird", (data: PlayerBirdData) => {
      this.x = data.x;
      this.y = data.y;
      // this.momentum = data.momentum;
      this.angle = data.angle;
      this.score = data.score;
      this.highscore = data.highscore;
      this.collision = data.collision;
    });
  }

  addControls(): void {
    if (!this.controlsAdded && !this.collision) {
      document.addEventListener("keypress", this.controlTheBird);
      this.controlsAdded = !this.controlsAdded;
    }
  }

  removeControls(): void {
    if (this.controlsAdded && this.collision) {
      document.removeEventListener("keypress", this.controlTheBird);
      this.controlsAdded = !this.controlsAdded;
      return;
    }
  }

  manageControls(state = "started"): void {
    switch (state) {
      case "started":
        this.addControls();
        break;
      case "over":
        this.removeControls();
        break;
    }
  }
}

export default PlayerBird;
