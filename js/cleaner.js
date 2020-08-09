import {canvasWidth, canvasHeight} from './canvasSize/setCanvasSize.js'
import {ctx} from './constants.js'

class Cleaner {
  draw() {ctx.clearRect(0, 0, canvasWidth, canvasHeight)}
}

export default Cleaner