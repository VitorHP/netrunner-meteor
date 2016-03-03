Package.describe({
  name: 'netrunner:modals',
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
  api.use('netrunner:app-lib');

  api.addFiles([
    'modals.js',
  ], ["client", "server"])

  api.addFiles([
    'client/templates/modal.html',
    'client/templates/modal.js',
    'client/templates/modal-choice.html',
  ], ["client"])

  api.export("Modals", ["client"])
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('netrunner:modals');
  api.addFiles('modals-tests.js');
});