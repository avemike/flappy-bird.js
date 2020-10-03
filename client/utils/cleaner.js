import { CTX, CANVAS_SIZE } from '../../configs/canvas';

const Cleaner = {
  draw() {
    CTX.clearRect(0, 0, CANVAS_SIZE.WIDTH, CANVAS_SIZE.HEIGHT);
  },
};

export default Cleaner;
