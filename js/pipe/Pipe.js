class Pipe{
    constructor(width, height, offsetX){
        this.width = width
        this.height = height
        this.offsetX = offsetX
        this.offsetY = -145
        let max = 178
        let min = -351
        this.numb = Math.floor(Math.random() * (max - min)) + min
    }

    render(){
        ctx.drawImage(pipe, this.offsetX, this.numb)
        // ctx.clearRect(0, 0, canvas.width, canvas.height)
    }

    changeOffset(){
        this.offsetX -= 4
    }

    draw(){
        this.changeOffset()
        this.detect()
        this.render()
        console.log(this.numb)
    }

    detect() {
        if (this.offsetX < - this.width ) {
            this.offsetX += 11 * 150
        }
    }
}