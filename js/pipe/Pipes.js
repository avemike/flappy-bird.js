class Pipes{
    constructor(){
        this.pipes = []
        let i = 0;
        do {
          this.pipes.push(new Pipe(52, 320, canvas.width + 212 * i))   
          i++;
        } while(i*210 < window.innerWidth)
    }
    create() {
      let lastPipeOffset = this.pipes[this.pipes.length - 1].offsetX
      this.pipes.push(new Pipe(52, 320, lastPipeOffset + 212 ))
    }
    draw(){     
      if(this.pipes[0].isOverScreen()) { 
        this.pipes.shift()
        this.create()
      }
      this.pipes.forEach( pipe => {
        pipe.draw()
      })
    }
}