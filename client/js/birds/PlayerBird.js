import Bird from './Bird';
import { birdProps } from '../constants';

class PlayerBird extends Bird {
  constructor({ socket }) {
    super();
    this.x = birdProps.x;
    this.y = birdProps.y;
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
