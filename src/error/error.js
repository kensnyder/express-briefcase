/**
 * Add error message
 * @param {String|Error} message  The error string (or the Error whose message property to use)
 * @returns {Response}
 * @chainable
 */
function error(message) {
  if (message instanceof Error) {
    message = message.message;
  }
  this.locals._errors?.push(message);
  return this;
}

module.exports = error;
