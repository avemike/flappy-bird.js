import { UPDATE_MILLISECONDS } from "../../configs/game";

type CallbackType = () => void;

export class FrameHandler {
  public callbacks: CallbackType[] = [];

  constructor() {
    setInterval(() => {
      this.callbacks.forEach((callback) => callback());
    }, UPDATE_MILLISECONDS);
  }

  addCallback(callback: CallbackType): void {
    this.callbacks.push(callback);
  }
}
