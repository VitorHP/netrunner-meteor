// Write your package code here!

function loadModal(data, callbacks = []){
  return new Promise(function(resolve, reject){
    let parentNode = document.body

    let view = Blaze.renderWithData(Template["modal"], data, parentNode)

    let domRange = view._domrange // TODO: Don't violate against the public API.

    let $modal = domRange.$('.modal')

    $modal.on('shown.bs.modal', function(event){
      $modal.find('[autofocus]').focus()
    })

    $modal.on('hidden.bs.modal', function(event){
      Blaze.remove(view)
    })

    callbacks.forEach(function(c){
      $modal.on(c.event, function(){
        c.fn($modal, resolve, reject)
      })
    })

    $modal.modal()
  })
}

Modals = {
  choiceModal(choices) {
    let dataContext = { templateName: "modalChoice", choices: choices }
    let callbacks   = [
      {
        event: "hidden.bs.modal",
        fn: function($modal, resolve, reject){
          //TODO: Why do I have to access value as an attribute?
          resolve($modal.find('.modal-choice__option:checked').attr("value"))
        }
      }
    ]

    return loadModal(dataContext, callbacks)
  },

  revealModal(cards, cardsToReveal=0) {
    let dataContext = { templateName: "modalReveal",
                        cards: cards,
                        cardsToReveal: cardsToReveal }

    return loadModal(dataContext)
  }
}
