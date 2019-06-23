class Pipe{
    constructor(width, height, offsetX){
        this.width = width
        this.height = height
        this.offsetX = offsetX
        let max = -150
        let min = -650
        this.numb = Math.floor(Math.random() * (max - min)) + min
    }

    render(){
        ctx.drawImage(pipe, this.offsetX, this.numb)
    }

    changeOffset(){
        this.offsetX -= 4
    }

    draw(){
        this.changeOffset()
        this.render()
    }
}