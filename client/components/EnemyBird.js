import Bird from "./Bird";

class EnemyBird extends Bird {
  constructor({ bird }) {
    super();
    this.x = bird.x;
    this.y = bird.y;
    this.momentum = bird.momentum;
  }

  // updates enemy bird position and momentum based on
  // websocket event inside EnemyBirdsFactory.js
  update(data) {
    this.y = data.y;
    this.momentum = data.momentum;
  }
}

export default EnemyBird;
