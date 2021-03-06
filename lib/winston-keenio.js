var KeenioClient = require('keen-js');
var util = require('util');
var winston = require('winston');
var JsonCircular = require('json-circular');


var _Keenio = function (options) {
  options = options || {};

  winston.Transport.call(this, options);

  if (!options.collection) {
   throw new Error('Keenio collection is required');
  }

  this.name  = options.name || 'keenio';
  this.level = options.level || 'info';
  this.strict = options.strict || false;
  this.collection = options.collection;

  this.client = new KeenioClient({
    projectId: options.projectId,
    writeKey: options.writeKey
  });

};

util.inherits(_Keenio, winston.Transport);

winston.transports.Keenio = _Keenio;

_Keenio.prototype.name = 'keenio';

_Keenio.prototype.log = function (level, msg, meta, callback) {

  function logged(err, res) {
    self.emit('logged');
    callback(null, !err && res.created);
  }

  // handle with circular objects
  // a meta-property @internal-ref is added for self-reference
  JsonCircular.preprocess(meta);

  var data = winston.clone(meta || {});
  var self = this;

  // in strict mode only events matching the currenct collection are logged
  if ( this.strict ){
    if ( !data.collection || data.collection !== this.collection ){
      return callback(null, true); // skip
    }
  }

  if (data.collection)
    delete data.collection;

  data.level = level;
  data.message = msg;

  return this.client.addEvent(this.collection, data, logged);

};

// Meteor
if (typeof Package !== 'undefined') {
  Keenio = _Keenio;
}
// Node.js
else if (typeof module !== 'undefined' && module.exports) {
    module.exports = _Keenio;
}
// included directly via <script> tag
else {
    this.Keenio = _Keenio;
}
