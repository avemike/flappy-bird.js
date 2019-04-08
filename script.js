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
        /* tutaj bedzie content */
    }

    resizeCanvas()
  })();

  /* zajebalem ten kod z neta x d */