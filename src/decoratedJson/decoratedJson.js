/**
 *
 * @param data
 */
function decoratedJson(data = null) {
  const status = this.statusCode;
  const took = this.locals._startedAt ? new Date() - this.locals._startedAt : 0;
  let shell = {
    date: this.locals._startedAt || new Date(),
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
}

module.exports = decoratedJson;
