type CallbackType = () => void;

export class FrameHandler {
  private callbacks: CallbackType[] = [];

  constructor() {
    // setInterval(() => {
    //   this.callbacks.forEach((callback) => callback());
    // }, UPDATE_MILLISECONDS);
  }

  runCallbacks() {
    this.callbacks.forEach((callback) => callback());
  }

  addCallback(callback: CallbackType) {
    this.callbacks.push(callback);
  }

  clear() {
    this.callbacks = [];
  }
}
