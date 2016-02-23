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
    'server/publish.js',
  ], ['server']);

  api.addFiles([
    'client/lib/_modules.js',
    'client/lib/actions.js',
    'client/lib/helper.js',
    'client/templates/runner-area.html',
    'client/templates/runner-area.js',
    'client/templates/corporation-area.html',
    'client/templates/action.html',
    'client/templates/action.js',
    'client/templates/board.html',
    'client/templates/board.js',
    'client/templates/hand.js',
  ], ['client']);
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('netrunner:board');
  api.addFiles('board-tests.js');
});
