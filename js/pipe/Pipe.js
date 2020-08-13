import {ctx, pipe} from './../constants.js'

class Pipe{
    constructor(width, height, offsetX){
        this.width = width
        this.height = height
        this.offsetX = offsetX
        let max = 0
        let min = 0 
        this.offsetY = Math.floor(Math.random() * (max - min)) + min
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