Package.describe({
  name: 'netrunner:spawn',
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
  api.use(['ecmascript', 'underscore']);
  api.addFiles('spawn.js');
  api.export('Spawn');
});

Package.onTest(function(api) {
  api.use([
    'ecmascript',
    'mike:mocha-package@0.5.7', 
    'practicalmeteor:chai@2.1.0_1',
    'practicalmeteor:sinon@1.14.1_2',
    'netrunner:spawn'
  ]);

  api.addFiles('spawn-tests.js');
});
