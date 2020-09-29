import { ctx, canvasSize } from './constants';

const Cleaner = {
  draw() {
    ctx.clearRect(0, 0, canvasSize.width, canvasSize.height);
  },
};

export default Cleaner;
