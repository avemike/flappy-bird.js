// const { socket } = require("../../client/utils/socketSetup");
const { checkCollisions } = require("../utils/checkCollisions");

class GameControls {
  constructor(bird, pipes, bases, socket, frameControl) {
    this.bird = bird;
    this.pipes = pipes;
    this.frameControl = frameControl;
    this.socket = socket;
    this.data = {
      state: "running",
    };

    socket.on("start game", () => {
      this.data.state = "started";
      this.frameControl.addCallback(bird.gravity.bind(bird));
      this.frameControl.addCallback(bird.angleControl.bind(bird));
      this.frameControl.addCallback(pipes.run.bind(pipes));
      this.frameControl.addCallback(this.check_over_v2.bind(this));
      // this.frameControl.addCallback(() =>
      //   checkCollisions(
      //     bird.data,
      //     pipes.data,
      //     this.data,
      //     this.socket,
      //     this.isOverlayActive
      //   )
      // );
      // this.frameControl.addCallback(this.checkIfOver.bind(this));
    });

    socket.on("restart", () => {
      this.data.state = "running";
      this.bird.resetState();
      this.pipes.resetState();
      this.frameControl.reset();
      this.frameControl.addCallback(bases.run.bind(bases));
    });
  }

  check_over_v2() {
    if (checkCollisions(this.bird.data, this.pipes.data)) {
      console.log("koniec");
      this.data.state = "over";
      this.socket.emit("game over");
      this.bird.setHighscore();
      this.frameControl.reset();
      this.frameControl.addCallback(this.bird.gravity.bind(this.bird));
      this.frameControl.addCallback(this.bird.angleControl.bind(this.bird));
      this.frameControl.addCallback(() =>
        checkCollisions(this.bird.data, this.pipes.data)
      );
    }
  }

  checkIfOver() {
    if (this.data.state === "over") {
      this.bird.setHighscore();
      this.frameControl.reset();
      this.frameControl.addCallback(this.bird.gravity.bind(this.bird));
      this.frameControl.addCallback(() =>
        checkCollisions(
          this.bird.data,
          this.pipes.data,
          this.data,
          this.socket,
          this.isOverlayActive
        )
      );
    }
  }
}

module.exports = { GameControls };
