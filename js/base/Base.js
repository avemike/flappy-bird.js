// import {canvasHeight} from '../canvasSize/setCanvasSize.js'
import {ctx, base, canvasSize} from './../constants.js'

class Base {
    constructor(width, height, offsetX) {
        this.width = width
        this.height = height
        this.offsetX = offsetX
        this.offsetY = canvasSize.height - this.height
    }

    render() {
        ctx.drawImage(base, this.offsetX, this.offsetY)
    }
    changeOffset() {
        this.offsetX -= 4
    }
    draw() {
        this.changeOffset()
        this.isOverScreen()
        this.render()
    }

    isOverScreen() {
        if (this.offsetX < - this.width ) {
            this.offsetX += 20 * 336
        }
    }
}

export default Base
