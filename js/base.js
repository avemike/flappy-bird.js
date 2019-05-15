class Base {
    constructor({width, height}){
        this.width = width
        this.height = height
        this.posY = canvas.height - this.height
        this.posX = canvas.width - this.width
    }

    render() {
        ctx.drawImage(base, this.posX, this.posY)
    }

    draw(){
        window.requestAnimationFrame(() => {
            this.render()
            this.posX -= 6
            this.draw()
        })
    }
}