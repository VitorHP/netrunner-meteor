// Write your package code here!

Modals = {
  choiceModal(choices) {
    return new Promise(function(resolve, reject){
      let dataContext = { templateName: "modalChoice", choices: choices }

      let parentNode = document.body

      let view = Blaze.renderWithData(Template["modal"], dataContext, parentNode)

      let domRange = view._domrange // TODO: Don't violate against the public API.

      let $modal = domRange.$('.modal')

      let res;

      $modal.on('shown.bs.modal', function(event){
        $modal.find('[autofocus]').focus()
      })

      $modal.on('hidden.bs.modal', function(event){
        //TODO: Why do I have to access value as an attribute?
        resolve($modal.find('.modal-choice__option:checked').attr("value"))

        Blaze.remove(view)
      })

      $modal.modal()

    })
  }
}
