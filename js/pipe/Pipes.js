class Pipes{
    constructor(){
        this.pipes = []
        console.log(window.innerWidth)
        let i = 0;
        do {
          this.pipes.push(new Pipe(52, 320, canvas.width + 210 * i))          
          i++;
        } while(i*210 < window.innerWidth)
    }
    create() {
      this.pipes.push(new Pipe(52, 320, canvas.width))
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