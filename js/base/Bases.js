class Bases {
    constructor(){
        this.bases = []

        for (let i = 0; i < 20; i++) {
            this.bases.push(new Base(336, 112, 336 * i))
        }
    } 


    render() {
        // ctx.clearRect(0, 0, canvas.width, canvas.height)
        // rurka.draw()
        this.bases.forEach(base => base.draw())
    }

    draw() {
    //     window.requestAnimationFrame(() => {
            this.render()
            // this.draw()
    //     })
    }
}