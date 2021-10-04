type CallbackType = () => void;

export class FrameHandler {
  private callbacks: CallbackType[] = [];

  constructor() {
    // setInterval(() => {
    //   this.callbacks.forEach((callback) => callback());
    // }, UPDATE_MILLISECONDS);
  }

  runCallbacks(): void {
    this.callbacks.forEach((callback) => callback());
  }

  addCallback(callback: CallbackType): void {
    this.callbacks.push(callback);
  }

  clear(): void {
    this.callbacks = [];
  }
}
