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
    'mongo',
    'ecmascript',
    'netrunner:app-lib'
  ]);
  api.addFiles(['app-core.js', 'lib/collections.js'], ["server", "client"]);
  api.export(["Runner", "Cards", "Decks", "Corp"], ["server", "client"]);
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('netrunner:app-core');
  api.addFiles('app-core-tests.js');
});
