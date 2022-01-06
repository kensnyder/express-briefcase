const decoratedJson = require('./decoratedJson/decoratedJson.js');
const error = require('./error/error.js');
const devError = require('./devError/devError.js');
const warn = require('./warn/warn.js');
const newRecord = require('./new/new.js');
const total = require('./total/total.js');
const {
  ServerResponse: { prototype: resPrototype },
} = require('http');

function extendResPrototype() {
  resPrototype.decoratedJson = decoratedJson;
  resPrototype.error = error;
  resPrototype.devError = devError;
  resPrototype.warn = warn;
  resPrototype.new = newRecord;
  resPrototype.total = total;
}

module.exports = extendResPrototype;
