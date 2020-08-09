import {canvas} from './../constants.js'


function setCanvasSize(){
    canvas.height = window.innerHeight * 0.9
    canvas.width = window.innerWidth * 0.3
    return {
        canvasWidth: canvas.width,
        canvasHeight: canvas.height
    }
}

export {setCanvasSize}