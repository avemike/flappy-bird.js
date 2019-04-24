class Bird {
    constructor({
        ctx,
        canvas,
        sprites,
        width,
        x,
        y
    }) {
        this.params = {
            ctx,
            canvas,
            sprites,
            width,
            ratio: 12 / 17,
            x: x || 100,
            y: y || 100
        }

        // Controls
        document.addEventListener('keypress', (event) => {
            if(event.key === 'w') this.params.y -= 30
        })
    }
    render() {
        const {
            ctx,
            sprites,
            x,
            y,
            width,
            ratio
        } = this.params
        ctx.drawImage(sprites[0], x, y, width, width * ratio)
    }
    gravity() {
        this.params.y += 2
    }
    animate() {
        window.requestAnimationFrame(() => {
            clear(this.params.canvas, this.params.ctx)
            this.render()
            this.gravity()
            this.animate()
        })
    }
}