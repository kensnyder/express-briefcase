/**
 * Send the given payload, wrapped with metadata including date, errors, warnings, and pagination
 * @param {*} [data=null]  The payload to send
 * @returns {Response}
 * @chainable
 */
function decoratedJson(data = null) {
  const status = this.statusCode;
  const took = this.locals._startedAt ? new Date() - this.locals._startedAt : 0;
  let shell = {
    date: this.locals._startedAt || new Date(),
    // in CloudFlare workers, "took" will always be 0, so omit in that case
    took: took > 0 ? took : undefined,
    status,
    statusClass: String(status).slice(0, 1) + 'xx',
    success: status < 400,
    errors: this.locals._errors,
    warnings: this.locals._warnings,
    new: this.locals._new,
    pagination: this.locals._pagination,
    payload: data,
  };
  if (this.locals._customizer) {
    shell = this.locals._customizer.call(this, shell);
  }
  this.json(shell);
  return this;
}

module.exports = decoratedJson;
