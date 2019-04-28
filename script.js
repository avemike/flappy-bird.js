(function(){
    var canvas = document.getElementById('app')
    var ctx = canvas.getContext('2d')

    canvas.height = window.innerHeight
    canvas.width = window.innerWidth

    const baseY = canvas.height - 112
    const bg_dayY = canvas.height - 1080
    

    function draw(){
        const bg_day = document.querySelector('.bg_day')
        const base = document.querySelector('.base')
            for(let i = 0; i <= canvas.width; i += 288){
                ctx.drawImage(bg_day, i, bg_dayY)
            }
            for(let i = 0; i <= canvas.width; i += 336)
            ctx.drawImage(base, i, baseY)

    }
    draw()
  })();