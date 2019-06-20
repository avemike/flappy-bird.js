class Pipes{
    constructor(){
        this.pipes = []
        this.pipes.push(new Pipe(50, 320, canvas.width))
        for(let i=1; i < this.pipes.length + 1; i++){
            this.pipes.push(new Pipe(50, 320, canvas.width + (150 * i)))
        }

    }

    render(){
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        this.pipes.forEach(pipe => pipe.draw())
    }

    draw(){
        window.requestAnimationFrame(() => {
            this.render()
            this.draw()
        })
        console.log(this.pipes)
        // this.render()
    }
}