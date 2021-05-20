import { UPDATE_MILLISECONDS } from "../../configs/game";

interface CallbackType {
  (): void;
}

export class FrameHandler {
  private callbacks: CallbackType[] = [];
  constructor() {
    setInterval(() => {
      this.callbacks.forEach((callback) => callback());
    }, UPDATE_MILLISECONDS);
  }

  addCallback(callback: CallbackType) {
    this.callbacks.push(callback);
  }

  reset() {
    this.callbacks = [];
  }
}
