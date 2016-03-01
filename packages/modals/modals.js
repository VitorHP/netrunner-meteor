// Write your package code here!

Modals = {
  show(choices) {
    let parentNode = document.body

    let view = Blaze.renderWithData(Template["modal"], choices, parentNode)

    let domRange = view._domrange // TODO: Don't violate against the public API.

    let $modal = domRange.$('.modal')

    $modal.on('shown.bs.modal', function(event){
      $modal.find('[autofocus]').focus()
    })

    $modal.on('hidden.bs.modal', function(event){
      Blaze.remove(view)
    })

    $modal.modal()
  }
}
