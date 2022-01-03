function decoratedJson(data = null) {
  const status = this.statusCode;
  const took = new Date() - this.startedAt;
  let shell = {
    date: new Date(),
    took: took > 0 ? took : undefined,
    status,
    statusClass: String(status).slice(0, 1) + 'xx',
    success: status < 400,
    errors: this._errors,
    warnings: this._warnings,
    new: this._new,
    pagination: this._pagination,
    payload: data,
  };
  if (this._customizer) {
    shell = this._customizer.call(this, shell);
  }
  this.json(shell);
}

module.exports = decoratedJson;
