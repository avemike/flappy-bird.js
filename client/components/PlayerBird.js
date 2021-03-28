import Bird from "./Bird";
import { BIRD_PROPS } from "../../configs/game";

class PlayerBird extends Bird {
  constructor(socket) {
    super();
    this.x = BIRD_PROPS.X;
    this.y = BIRD_PROPS.Y;
    this.momentum = 2;
    this.score = 0;
    this.highscore = 0;
    this.collision = false;
    this.socket = socket;
    this.controlsAdded = false;
    this.controlTheBird = (event) => {
      if (event.key === "w") {
        console.log("jump");
        this.socket.emit("jump");
      }
    };
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
      this.highscore = data.highscore;
      this.collision = data.collision;
    });
  }

  manageControls(state) {
    const addControls = () => {
      if (!this.controlsAdded && !this.collision) {
        document.addEventListener("keypress", this.controlTheBird);
        this.controlsAdded = !this.controlsAdded;
        console.log("dodalem");
      }
    };

    const removeControls = () => {
      if (this.controlsAdded && this.collision) {
        document.removeEventListener("keypress", this.controlTheBird);
        this.controlsAdded = !this.controlsAdded;
        console.log("zabralem");
        return;
      }
    };

    switch (state) {
      case "started":
        addControls();
      case "over":
        removeControls();
    }
  }
}
export default PlayerBird;
