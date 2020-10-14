import EnemyBird from '../components/EnemyBird';

// EnemyBirdsFactory creates new EnemyBirds and updates existing ones
class EnemyBirdsFactory {
  constructor(socket) {
    this.storedBirds = {};

    socket.on('otherBird', (bird) => {
      this.use(bird);
    });
    socket.on('otherBirdDc', (birdId) => {
      delete this.storedBirds[birdId];
    });
  }

  use(bird) {
    console.log(bird.id);
    if (!this.storedBirds[bird.id]) {
      // create new bird
      const newBird = new EnemyBird({ bird });
      this.storedBirds[bird.id] = newBird;
      return;
    }
    // update existing bird
    this.storedBirds[bird.id].update(bird);
  }

  draw() {
    Object.keys(this.storedBirds).forEach((birdId) => {
      this.storedBirds[birdId].draw();
    });
  }
}

export default EnemyBirdsFactory;
