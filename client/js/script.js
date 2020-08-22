import io from 'socket.io-client';

import Bases from './base/Bases';
import Pipes from './pipe/Pipes';
import Bird from './Bird';
import Game from './Game';
import setCanvasSize from './setCanvasSize';
import cleaner from './cleaner';

setCanvasSize();

const socket = io('http://localhost:3000');

const bases = new Bases();
const pipes = new Pipes();
const bird = new Bird(socket);
// controlling all processes
const main = new Game({ cleaner, pipes, bases, bird, socket });
main.create();
