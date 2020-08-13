import Bases from './base/Bases';
import Pipes from './pipe/Pipes';
import Bird from './Bird';
import Game from './Game';
import setCanvasSize from './setCanvasSize';

import cleaner from './cleaner';

setCanvasSize();

const baza = new Bases();
const rurka = new Pipes();
const mainBird = new Bird();
// controlling all processes
const main = new Game(cleaner, rurka, baza, mainBird);
main.create();
