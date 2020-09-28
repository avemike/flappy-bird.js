import io from 'socket.io-client';

import Bases from './base/Bases';
import PipesFactory from './PipesFactory';
import Game from './Game';
import setCanvasSize from './setCanvasSize';
import cleaner from './cleaner';
import EnemyBirdsFactory from './EnemyBirdsFactory';
import PlayerBird from './birds/PlayerBird';

setCanvasSize();

const socket = io('http://localhost:3000');

const enemyBirdsFactory = new EnemyBirdsFactory(socket);
const bases = new Bases();
const pipesFactory = new PipesFactory(socket);
const bird = new PlayerBird({ socket });
// controlling all processes
const main = new Game({
  cleaner,
  pipes: pipesFactory,
  bases,
  bird,
  enemyBirdsFactory,
  socket,
});
main.create();
