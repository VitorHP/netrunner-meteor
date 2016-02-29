Package.describe({
  name: 'netrunner:choice-modal',
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
    'choice-modal.js',
  ], ["client", "server"])

  api.addFiles([
    'client/templates/choice-modal.html',
    'client/templates/choice-modal.js',
  ], ["client"])

  api.export("ChoiceModal", ["client"])
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('netrunner:choice-modal');
  api.addFiles('choice-modal-tests.js');
});
