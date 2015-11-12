var packageName = 'mstn:winston-keenio';
var where = 'server';

// XXX how can I update this list automatically?
// I could read package.json...
Npm.depends({
  'keen-js':'3.2.5',
  'util':'0.10.3',
  'winston':'1.0.0',
  'json-circular':'0.0.1'
});

Package.describe({
  name: 'mstn:winston-keenio',
  version: 'PACKAGE_VERSION',
  // Brief, one-line summary of the package.
  summary: 'A winston transport for keen.io',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/mstn/winston-keenio',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1');
  api.addFiles('meteor/environment.js', where);
  api.addFiles('lib/winston-keenio.js', where);
  api.export('Keenio');
});

Package.onTest(function(api) {
  api.use('tinytest', where);
  api.use(packageName, where);
  api.addFiles('meteor/test.js', where);
});
