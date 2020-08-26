import Bird from './Bird';

// EnemyBirdsFactory creates new EnemyBirds and updates existing ones
class EnemyBirdsFactory {
  constructor(socket) {
    this.storedBirds = {};

    socket.on('otherBird', (birdData) => {
      this.use(birdData);
    });
    socket.on('otherBirdDc', (birdId) => {
      delete this.storedBirds[birdId];
    });
  }

  use(birdData) {
    if (!this.storedBirds[birdData.id]) {
      // create new bird
      const newBird = new Bird({ type: 'enemy', birdData });
      this.storedBirds[birdData.id] = newBird;
      return;
    }
    // update existing bird
    this.storedBirds[birdData.id].update(birdData);
  }

  draw() {
    Object.keys(this.storedBirds).forEach((birdId) => {
      this.storedBirds[birdId].draw();
    });
  }
}
export default EnemyBirdsFactory;
