import Bird from "./Bird";

// TODO clean this up and make it work

class EnemyBird extends Bird {
  private momentum: number;

  constructor(bird: { momentum: number }) {
    super();
    // this.x = bird.x;
    // this.y = bird.y;
    this.momentum = bird.momentum;
  }

  // updates enemy bird position and momentum based on
  // websocket event inside EnemyBirdsFactory.js
  update(data: { y: number; momentum: number }) {
    this.y = data.y;
    this.momentum = data.momentum;
  }
}

export default EnemyBird;
