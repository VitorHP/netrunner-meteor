import './zoom.html'

export const Zoom = {
  on($targetImg) {
    $targetImg.on('click', function(event) {
      let parentNode = document.body

      let src = $(event.target).attr('src')

      let view = Blaze.renderWithData(Template['zoom'], { src: src }, parentNode)
    })
  }
}
