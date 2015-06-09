// based on https://github.com/winstonjs/winston-loggly/blob/master/test/winston-loggly-test.js

var vows = require('vows');
var assert = require('assert');
var helpers = require('winston/test/helpers');
var Keenio = require('../lib/winston-keenio').Keenio;

var client;
var config;

try {
  config = require('./config');
}
catch (ex) {
  console.log('Error reading test/config.json.')
  console.log('Are you sure it exists?\n');
  console.dir(ex);
  process.exit(1);
}

// create client

client = new Keenio({
  projectId: config.transports.keenio.projectId,
  writeKey: config.transports.keenio.writeKey,
  collection: config.transports.keenio.collection
});

function assertKeenio(client) {
  assert.instanceOf(client, Keenio);
  assert.isFunction(client.log);
}

vows.describe('winston-keenio').addBatch({
  "An instance of the Keenio Transport": {
    "when passed an input token": {
      "should have the proper methods defined": function () {
        assertKeenio(client);
      },
      "the log() method": helpers.testNpmLevels(client, "should log messages to keenio", function (ign, err, logged) {
        assert.isNull(err);
        assert.isTrue(logged);
      })
    }
  }
}).export(module);
