import {canvasWidth, canvasHeight} from './canvasSize/setCanvasSize.js'
import Bases from './base/Bases.js'
import Pipes from './pipe/Pipes.js'
import Cleaner from './cleaner.js'
import Game from './game.js'

const baza = new Bases()
const rurka = new Pipes()
const cleaner = new Cleaner()
// controlling all processes
const main = new Game(cleaner, rurka, baza)
main.render()