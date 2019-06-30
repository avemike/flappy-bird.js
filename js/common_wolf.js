class commonW{
  constructor(...drawable) {
    this.drawable = drawable
  }
  render() {
    window.requestAnimationFrame( () => {
      // execute all draw animations within given objects
      this.drawable.forEach( object => {
        object.draw()
      })

      this.render()
    })
  }
}