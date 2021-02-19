import Bird from "./Bird";
import { BIRD_PROPS } from "../../configs/game";

class PlayerBird extends Bird {
  constructor({ socket }) {
    super();
    this.x = BIRD_PROPS.X;
    this.y = BIRD_PROPS.Y;
    this.momentum = 2;
    this.score = 0;
    this.collision = false;
    this.socket = socket;
    this.controlsAdded = false;

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

  setupUpdateSocket() {
    this.socket.on("bird", (data) => {
      this.x = data.x;
      this.y = data.y;
      this.momentum = data.momentum;
      this.score = data.score;
      this.collision = data.collision;
    });
  }

  manageControls() {
    const controlTheBird = (event) => {
      console.log("chuj");
      if (event.key === "w") {
        this.socket.emit("jump");
      }

      if (this.collision) {
        document.removeEventListener("keypress", controlTheBird);
        this.added = !this.added;
        console.log("zabralem");
      }
    };

    if (!this.added && !this.collision) {
      document.addEventListener("keypress", controlTheBird);
      this.added = !this.added;
      console.log("dodalem");
    }
  }
}
export default PlayerBird;
