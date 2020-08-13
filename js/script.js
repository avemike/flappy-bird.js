import Bases from './base/Bases.js'
import Pipes from './pipe/Pipes.js'
import Cleaner from './cleaner.js'
import Bird from './Bird.js'
import Game from './game.js'
import setCanvasSize from './setCanvasSize.js'

setCanvasSize()

const baza = new Bases()
const rurka = new Pipes()
const cleaner = new Cleaner()
const mainBird = new Bird()
// controlling all processes
const main = new Game(cleaner, rurka, baza, mainBird)
main.create()
