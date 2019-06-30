class Base {
    constructor(width, height, offsetX) {
        this.width = width
        this.height = height
        this.offsetX = offsetX
        this.offsetY = canvas.height - this.height
    }

    render() {
        ctx.drawImage(base, this.offsetX, this.offsetY)
    }
    changeOffset() {
        this.offsetX -= 6
    }
    draw() {
        // console.log(this.offsetX)
        this.changeOffset()
        this.detect()
        this.render()
    }

    detect() {
        if (this.offsetX < - this.width ) {
            this.offsetX += 20 * 336
        }
    }
}