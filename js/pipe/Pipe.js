import {ctx, pipe, canvas} from './../constants.js'
// import {canvasWidth} from '../canvasSize/setCanvasSize.js'

class Pipe{
    constructor(width, height, offsetX){
        this.width = width
        this.height = height
        this.offsetX = offsetX
        let max = 0
        let min = 0 
        this.offsetY = Math.floor(Math.random() * (max - min)) + min
        console.log(this.offsetY)
    }

    render(){
        ctx.drawImage(pipe, this.offsetX, this.offsetY)
    }

    isOverScreen(){
        return this.offsetX <= -this.width ? true : false
    }

    changeOffset(){
        this.offsetX -= 4
    }

    draw(){
        this.changeOffset()
        this.render()
    }
}

export default Pipe