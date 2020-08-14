import Bases from './base/Bases';
import Pipes from './pipe/Pipes';
import Bird from './Bird';
import Game from './Game';
import setCanvasSize from './setCanvasSize';

import cleaner from './cleaner';

setCanvasSize();

const bases = new Bases();
const pipes = new Pipes();
const bird = new Bird();
// controlling all processes
const main = new Game({ cleaner, pipes, bases, bird });
main.create();
