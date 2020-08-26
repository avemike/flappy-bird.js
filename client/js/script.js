import io from 'socket.io-client';

import Bases from './base/Bases';
import Pipes from './pipe/Pipes';
import Bird from './Bird';
import Game from './Game';
import setCanvasSize from './setCanvasSize';
import cleaner from './cleaner';
import EnemyBirdsFactory from './EnemyBirdsFactory';

setCanvasSize();

const socket = io('http://localhost:3000');

const enemyBirdsFactory = new EnemyBirdsFactory(socket);
const bases = new Bases();
const pipes = new Pipes();
const bird = new Bird({ socket, type: 'player' });
// controlling all processes
const main = new Game({
  cleaner,
  pipes,
  bases,
  bird,
  enemyBirdsFactory,
  socket,
});
main.create();
