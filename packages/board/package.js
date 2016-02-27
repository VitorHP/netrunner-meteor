Package.describe({
  name: 'netrunner:board',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');

  api.use([
    'netrunner:app-lib@0.0.1',
    'netrunner:app-core@0.0.1'
  ]);

  api.addFiles([
    'board.js',
    'lib/methods.js'
  ], ['client', 'server']);

  api.addFiles([
    'client/lib/actions.js',
    'client/lib/action-factory.js',
    'client/lib/helper.js',
    'client/templates/runner-area.html',
    'client/templates/runner-area.js',
    'client/templates/card.html',
    'client/templates/card.js',
    'client/templates/corp-area.html',
    'client/templates/corp-area.js',
    'client/templates/action.html',
    'client/templates/action.js',
    'client/templates/board.html',
    'client/templates/board.js',
    'client/templates/hand.js',
  ], ['client']);
});

Package.onTest(function(api) {
  api.use([
    'mike:mocha-package@0.5.7', 
    'practicalmeteor:chai@2.1.0_1',
    'practicalmeteor:sinon@1.14.1_2',
    'netrunner:board',
  ]);

  api.addFiles([
    'client/lib/actions.js',
    'tests/client/lib/actions-spec.js'
  ], ["client"]);

  api.export("Actions")
});
