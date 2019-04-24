const canvas = document.querySelector('#app')
const ctx = canvas.getContext('2d') 
const birdSprites = document.querySelectorAll('.ptaszek')
// set canvas width/height
canvas.width = window.innerWidth
canvas.height = window.innerHeight


const bird = new Bird({
    ctx,
    canvas,
    sprites: birdSprites,
    width: 100,
})
bird.animate()