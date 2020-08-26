import io from 'socket.io-client';

import Bases from './base/Bases';
import Pipes from './pipe/Pipes';
import Game from './Game';
import setCanvasSize from './setCanvasSize';
import cleaner from './cleaner';
import EnemyBirdsFactory from './EnemyBirdsFactory';
import PlayerBird from './birds/PlayerBird';

setCanvasSize();

const socket = io('http://localhost:3000');

const enemyBirdsFactory = new EnemyBirdsFactory(socket);
const bases = new Bases();
const pipes = new Pipes();
const bird = new PlayerBird({ socket });
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
