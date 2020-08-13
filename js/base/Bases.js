import Base from './Base.js'

class Bases {
    constructor(){
        this.bases = []

        for (let i = 0; i < 20; i++) {
            this.bases.push(new Base(336, 112, 336 * i))
        }
    } 
    draw() {
      this.bases.forEach(base => base.draw())
    }
}

export default Bases