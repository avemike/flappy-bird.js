import io from 'socket.io-client';

import Game from './Game';
import EnemyBirdsFactory from './factories/EnemyBirdsFactory';
import PipesFactory from './factories/PipesFactory';
import BaseFactory from './factories/BaseFactory';
import PlayerBird from './components/PlayerBird';
import setCanvasSize from './utils/setCanvasSize';
import cleaner from './utils/cleaner';

setCanvasSize();

const socket = io('http://localhost:3000');

const enemyBirdsFactory = new EnemyBirdsFactory(socket);
const bases = new BaseFactory(socket);
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
