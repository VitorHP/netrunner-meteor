Package.describe({
  name: 'netrunner:app-lib',
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

  var packages = [
    'meteor-base',
    'mobile-experience',
    'mongo',
    'blaze-html-templates',
    'session',
    'jquery',
    'tracker',
    'standard-minifiers',
    'es5-shim',
    'ecmascript',

    'dburles:collection-helpers@1.0.4',
    'aldeed:simple-schema@1.5.3',
    'kadira:blaze-layout',
    'kadira:flow-router',
    'reywood:publish-composite',
    'reactive-dict',
    'reactive-var',
    'ramda:ramda'
  ]

  api.use(packages);
  api.imply(packages);

  api.addFiles('app-lib.js');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('netrunner:app-lib');
  api.addFiles('app-lib-tests.js');
});
