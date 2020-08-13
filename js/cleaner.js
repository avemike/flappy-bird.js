import {ctx, canvasSize} from './constants.js'

export default class Cleaner {
  draw() {ctx.clearRect(0, 0, canvasSize.width, canvasSize.height)}
}