/**
 * Add error message only if NODE_ENV is "development"
 * @param {String|Error} message
 * @returns {Response}
 * @chainable
 */
function devError(message) {
  if (process.env.NODE_ENV !== 'development') {
    return this;
  }
  return this.error(message);
}

module.exports = devError;
