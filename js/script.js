    const canvas = document.querySelector('#app')
    const ctx = canvas.getContext('2d')
    const base = document.querySelector('.base')
    const pipe = document.querySelector('.pipe')

    canvas.height = window.innerHeight
    canvas.width = window.innerWidth

    const baza = new Bases()
    const rurka = new Pipes()
    rurka.draw()
    // baza.draw()
