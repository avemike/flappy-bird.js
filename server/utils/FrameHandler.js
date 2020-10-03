const { UPDATE_MILLISECONDS } = require('../../configs/game');

class FrameHandler {
  constructor() {
    this.callbacks = [];

    setInterval(() => {
      this.callbacks.forEach((callback) => callback());
    }, UPDATE_MILLISECONDS);
  }

  addCallback(callback) {
    this.callbacks.push(callback);
  }
}

module.exports = { FrameHandler };
