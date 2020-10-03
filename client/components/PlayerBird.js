import Bird from './Bird';
import { BIRD_PROPS } from '../../configs/game';

class PlayerBird extends Bird {
  constructor({ socket }) {
    super();
    this.x = BIRD_PROPS.X;
    this.y = BIRD_PROPS.Y;
    this.momentum = 2;

    this.socket = socket;

    // TEMP - DEBUGGING
    setInterval(() => {
      this.socket.emit('jump');
    }, 670);
    // TEMP

    this.setupUpdateSocket();
    this.setupControls();
  }

  setupUpdateSocket() {
    this.socket.on('bird', (data) => {
      this.x = data.x;
      this.y = data.y;
      this.momentum = data.momentum;
    });
  }

  setupControls() {
    document.addEventListener('keypress', (event) => {
      if (event.key === 'w') {
        this.socket.emit('jump');
      }
    });
  }
}
export default PlayerBird;
