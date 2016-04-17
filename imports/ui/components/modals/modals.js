import { Blaze } from 'meteor/kadira:blaze-layout';
import { Template } from 'meteor/templating';

function loadModal(data, callbacks = []) {
  return new Promise((resolve, reject) => {
    const parentNode = document.body;

    const view = Blaze.renderWithData(Template.modal, data, parentNode);

    const domRange = view._domrange; // TODO: Don't violate against the public API.

    const $modal = domRange.$('.modal');

    $modal.on('shown.bs.modal', () => {
      $modal.find('[autofocus]').focus();
    });

    $modal.on('hidden.bs.modal', () => {
      Blaze.remove(view);
    });

    callbacks.forEach((c) => {
      $modal.on(c.event, () => {
        c.fn($modal, resolve, reject);
      });
    });

    $modal.modal();
  });
}

export const Modals = {
  serverChoiceModal(servers) {
    const choices = servers.reduce((memo, s, index) => {
      memo.unshift({ label: `Server #${index + 1}`, value: index });
      return memo;
    }, [{ label: 'New Server', value: 'new-server' }]);

    return this.choiceModal(choices);
  },

  cardSideModal() {
    const choices = [
      { label: 'Rezzed', value: true },
      { label: 'Unrezzed', value: false },
    ];

    return this.choiceModal(choices);
  },

  choiceModal(choices) {
    const dataContext = { templateName: 'modalChoice', choices };
    const callbacks = [
      {
        event: 'hidden.bs.modal',
        fn($modal, resolve) {
          // TODO: Why do I have to access value as an attribute?
          resolve($modal.find('.modal-choice__option:checked').attr('value'));
        },
      },
    ];

    return loadModal(dataContext, callbacks);
  },

  revealModal(cards, cardsToReveal = 0) {
    const dataContext = {
      templateName: 'modalReveal',
      cards,
      cardsToReveal,
    };

    return loadModal(dataContext);
  },
};
