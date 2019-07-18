  const canvas = document.querySelector('#app')
  const ctx = canvas.getContext('2d')
  const base = document.querySelector('.base')
  const pipe = document.querySelector('.pipe')
  const bird = document.querySelector('.bird')

  canvas.height = window.innerHeight
  canvas.width = window.innerWidth

  const baza = new Bases()
  const rurka = new Pipes()
  const cleaner = new Cleaner()
  const ptaszek = new Bird({
    ctx,
    canvas,
    sprites: bird,
    width: 40,
  })
  // controlling all processes
  const main = new commonW(cleaner, rurka, baza, ptaszek)
  main.render()

