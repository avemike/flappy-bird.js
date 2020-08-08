const canvas = document.querySelector('#app')
const ctx = canvas.getContext('2d')
const base = document.querySelector('.base')
const pipe = document.querySelector('.pipe')

canvas.height = window.innerHeight * 0.9
canvas.width = window.innerWidth * 0.3

const baza = new Bases()
const rurka = new Pipes()
const cleaner = new Cleaner()
// controlling all processes
const main = new commonW(cleaner, rurka, baza)
main.render()