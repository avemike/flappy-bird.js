class Bird {
    constructor({ ctx, canvas, sprites, width, x, y }) {
        this.params = {
            ctx,
            canvas,
            sprites,
            width,
            ratio: 12 / 17,
            x: x || 100,
            y: y || 100,
            speed: 0,
            momentum: 2
        }
        
        // Controls
        document.addEventListener('keypress', (event) => {
            if(event.key === 'w') this.params.momentum = -5
        })
    }

    gravity() {
        let { momentum, y } = this.params;

        if(momentum < 4) {
            this.params.momentum += 0.1
        }
    }
    move() {
        const { momentum } = this.params;
        this.params.y += momentum*2;
    }
    animate() {
        window.requestAnimationFrame(() => {
            clear(this.params.canvas, this.params.ctx)
            this.render()
            this.gravity()
            this.move()
            this.animate()
        })
    }

    render() {
        const {
            ctx,
            sprites,
            x,
            y,
            width,
            ratio,
        } = this.params
        ctx.drawImage(sprites[0], x, y, width, width * ratio)
    }
}