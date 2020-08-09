const canvas = document.querySelector('#app')
const ctx = canvas.getContext('2d')
const base = document.querySelector('.base')
const pipe = document.querySelector('.pipe')

const pipeProps = {
    width: 52,
    height: 320
}

const distBetwPipes = 200

export {canvas, ctx, base, pipe, distBetwPipes, pipeProps}