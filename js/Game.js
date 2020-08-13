class Game {
  constructor(...drawable) {
    this.drawable = drawable;
  }

  create() {
    window.requestAnimationFrame(() => {
      // execute all draw animations within given objects
      this.drawable.forEach((object) => {
        object.draw();
      });

      this.create();
    });
  }
}
export default Game;
