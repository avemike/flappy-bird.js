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

  addCallback(callback: CallbackType): void {
    this.callbacks.push(callback);
  }

  clear(): void {
    this.callbacks = [];
  }
}
