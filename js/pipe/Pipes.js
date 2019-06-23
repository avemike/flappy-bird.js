class Pipes{
    constructor(){
        this.pipes = []
        let amount = 5
        for(let i = 0; i < amount; i++){
            this.pipes.push(new Pipe(50, 320, canvas.width + (150 * i)))
        }
    }

    draw(){
        this.pipes.forEach(pipe => pipe.draw())
    }
}