Package.describe({
  name: 'netrunner:app-core',
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
    'netrunner:app-lib'
  ]);
  api.addFiles([
    'app-core.js',
    'lib/methods.js',
    'lib/collections.js',
    'lib/collections/game.js',
  ], ["server", "client"]);

  api.addFiles([
    'server/publish.js'
  ], ["server"]);

  api.export(["Runner", "Cards", "Decks", "Corp", "Game"], ["server", "client"]);
});

Package.onTest(function(api) {
  api.use([
    'mike:mocha-package@0.5.7',
    'practicalmeteor:chai@2.1.0_1'
  ]);

  api.use([
    'aldeed:simple-schema@1.5.3',
    'dburles:collection-helpers@1.0.4',
    'netrunner:app-core',
  ]);
});
