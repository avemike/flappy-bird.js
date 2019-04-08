(function(){
    var canvas = document.getElementById('app')
    var ctx = canvas.getContext('2d')

    window.addEventListener('resize', resizeCanvas)

    function resizeCanvas(){
        canvas.height = window.innerHeight
        canvas.width = window.innerWidth
        draw()
    }
    
    function draw(){
        let bg_day = new Image()
        let base = new Image()
        base.src = 'base.png'
        bg_day.src = 'background-day.png'
        base.onload = () => ctx.drawImage(base, 100, 100)
        bg_day.onload = () => ctx.drawImage(bg_day, 100, 100)
    }

    resizeCanvas()
  })();

  /* zajebalem ten kod z neta x d */