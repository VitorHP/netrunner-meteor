// Write your package code here!
ChoiceModal = {
  show(choices) {
    let parentNode = document.body

    let view = Blaze.renderWithData(Template["choiceModal"], choices, parentNode)

    let domRange = view._domrange // TODO: Don't violate against the public API.

    let $modal = domRange.$('.choice-modal')

    $modal.on('shown.bs.modal', function(event){
      $modal.find('[autofocus]').focus()
    })

    $modal.on('hidden.bs.modal', function(event){
      Blaze.remove(view)
    })

    $modal.modal()
  }
}
