/**
 * Add warning message
 * @param {String|Error} message  The warning string (or the Error whose message property to use)
 * @returns {Response}
 * @chainable
 */
function warn(message) {
  if (message instanceof Error) {
    message = message.message;
  }
  this.locals._warnings.push(message);
  return this;
}

module.exports = warn;
