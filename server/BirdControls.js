class Bird {
  constructor() {
    this.data = {
      x: 100,
      y: 100,
      momentum: 2,
    };
  }

  jump() {
    this.data.momentum = -5.8;
  }

  gravity() {
    const { momentum } = this.data;
    if (momentum < 10) {
      this.data.momentum += 0.3;
    }
    this.data.y += momentum;
  }
}

module.exports = Bird;
